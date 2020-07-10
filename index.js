const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");

// Handlers for database stuff
const db = require("./db.js");
const { s3Url } = require("./config.json");

// Handlers for bcrypt stuff
const bc = require("./bc.js");
// email stuff
const ses = require("./ses");
// fileupload stuff
const aws = require("./aws.js");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24)
            .then(function (uid) {
                callback(null, uid + path.extname(file.originalname));
            })
            .catch((err) => {
                console.log("Something went wrong!");
            });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

const {
    requireLoggedInUser,
    requireLoggedOutUser,
    requireNoSignature,
    requireSignature,
} = require("./routeMiddleware.js");

app.use(compression());
app.use(
    cookieSession({
        secret: `Let's be backrooms shining dollardollarbillyo.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
app.use(
    express.urlencoded({
        extended: false,
    })
);
//  app.use(csurf());
app.use(function (req, res, next) {
    res.setHeader("x-frame-options", "deny");
    res.locals.user = req.session.user;
    next();
});
// app.use(requireLoggedInUser);
app.use(express.json());
app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
app.use(express.static("./public"));

// app.use(requireLoggedInUser);

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        // if the user is logged in...
        res.redirect("/");
    } else {
        // the user is NOT logged in...
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    bc.makeHash(password)
        .then((hashedPw) => {
            return db.addUser(firstName, lastName, email, hashedPw);
        })
        .then((rows) => {
            // console.dir(rows);
            // console.log(JSON.stringify(rows, null, 4));

            const { id: userId } = rows[0];

            req.session = { userId, firstName, lastName };
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("Error in POST /register\n", err);
            res.sendStatus(500);
        });
});

app.post("/login", requireLoggedOutUser, (req, res) => {
    const { email, password } = req.body;

    db.getPwByEmail(email)
        .then((rows) => {
            // console.log("response from SQL db :", rows);
            if (rows.length === 0) {
                res.json({ success: false });
            }
            const { password: hashInDB, id: userId } = rows[0];

            bc.compare(password, hashInDB).then((match) => {
                if (match === true) {
                    // check if user has signed
                    // db.getSigId(req.session.userId)
                    //     .then((dbResponseObjNext) => {
                    //         if (dbResponseObjNext.rows[0]) {
                    //             // if the user has already signed
                    //             const sigId = dbResponseObjNext.rows[0].id;
                    //             req.session.user.sigId = sigId;
                    //             res.redirect("/thanks");
                    //         } else {
                    //             // the user has not signed yet
                    //             req.session.user.sigId = null;
                    //             res.redirect("/petition");
                    //         }
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //     });
                    req.session.userId = userId;
                    res.json({ success: true });
                } else {
                    // user is in db but has typed wrong password

                    res.json({ success: false });
                }
            });
        })
        .catch((err) => {
            console.log("Error in POST /login\n", err);
            // render login with error
            res.json({ success: false });
        });
});
app.post("/password/reset/start", (req, res) => {
    const email = req.body.email;
    db.getPwByEmail(email)
        .then((rows) => {
            // console.log("rows from reset/start", rows);
            if (rows.length > 0) {
                const secretCode = cryptoRandomString({
                    length: 4,
                });
                db.addCode(email, secretCode)
                    .then((res) => {
                        // console.log(
                        //     "### /POST /reset/start ###\nEmail verified, now sending email"
                        // );
                        return ses.sendEmail(
                            email,
                            "Splainer: Reset your password",
                            `Your verification code is <bold> ${secretCode} </bold>`
                        );
                    })
                    .then((resAfterEmail) => {
                        res.json({ success: true, email: req.body.email });
                    })
                    .catch((err) => {
                        console.error("error in db.addCode\n", err);
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.error("error in /reset/start", err);
        });
});
app.post("/password/reset/verify", (req, res) => {
    const codeUser = req.body.code;
    db.checkCode(codeUser)
        .then((rows) => {
            if (rows.length > 0) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.error("error in /reset/verify", err);
            res.json({ success: false });
        });
});
app.post("/password/reset/update", (req, res) => {
    // console.log("### req.body in /update: ", req.body);
    // verify?
    const { email, password } = req.body;
    bc.makeHash(password)
        .then((hashedPw) => {
            return db.updatePassword(email, hashedPw);
        })
        .then((rows) => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.error("error in /reset/update", err);
            res.json({ success: false });
        });
});
app.get("/user", (req, res) => {
    if (!req.session.userId) {
        res.json({ success: false });
        res.end();
    }

    db.getUser(req.session.userId)
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error("Error in /user, in db.getUser:\n", err);

            res.json({ success: false });
            res.end();
        });
});
app.get("/api/user/:userId", (req, res) => {
    console.log("current req.session.userId", req.session.userId);

    if (Number(req.params.userId) === req.session.userId) {
        return res.json({
            sameId: true,
        });
    }
    db.getUser(req.params.userId)
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error("Error in /user, in db.getUser:\n", err);

            res.json({ success: false });
            res.end();
        });
});
app.post(
    "/uploadUserImg",
    uploader.single("file"),
    aws.uploadMiddleware,
    (req, res) => {
        // console.log("/uploadUserimg req: ", req.body);
        const { filename } = req.file;
        const imageUrl = `${s3Url}${filename}`;

        db.addProfilePic(req.session.userId, imageUrl)
            .then((rows) => {
                // console.log("###Response from db #rows# ", rows);
                res.json(rows[0]);
            })
            .catch((err) => {
                res.end(err);
                console.log(err);
            });
    }
);
app.post("/updateBio", (req, res) => {
    console.log("body: ", req.body);
    db.updateBio(req.session.userId, req.body.bio)
        .then((rows) => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.error("error in /reset/update", err);
            res.json({ success: false });
        });
});
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("social network server is listening on 8080.");
});
