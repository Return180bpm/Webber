const fs = require("fs");
const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.uploadImg = function (reqFile) {
    return new Promise((res, rej) => {
        const { filename, mimetype, size, path } = reqFile;

        const promise = s3
            .putObject({
                Bucket: "spicedling",
                ACL: "public-read",
                Key: filename,
                Body: fs.createReadStream(path),
                ContentType: mimetype,
                ContentLength: size,
            })
            .promise();

        promise
            .then(() => {
                res();
                fs.unlink(path, () => {});
            })
            .catch((err) => {
                rej();
                console.log(err);
            });
    });
};

module.exports.uploadMiddleware = (req, res, next) => {
    if (!req.file) {
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;
    const stream = fs.createReadStream(path);

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: stream,
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            // it worked!!!
            // console.log("IT WORKED");

            next();
            fs.unlink(path, () => {});
        })
        .catch((err) => {
            // uh oh
            // console.log("IT DIDNT");
            res.sendStatus(500);
            console.log(err);
        });
};
