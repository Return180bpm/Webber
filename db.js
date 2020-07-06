const spicedPg = require("spiced-pg");
const bc = require("./bc.js");

const { query } = require("express");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPw } = require("./secrets.json");
    db = spicedPg(`postgres:${dbUser}:${dbPw}@localhost:5432/socialnetwork`);
}

// const db = spicedPg(
//     process.env.DATABASE_URL ||
//         `postgres:postgres:postgres@localhost:5432/petitionDB`
// );

//// TABLE = users
exports.addUser = (first, last, email, password) => {
    return db
        .query(
            `INSERT INTO users (first, last, email, password, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id`,
            [first, last, email, password]
        )
        .then(({ rows }) => rows);
};
exports.getUserById = (userId) => {
    return db.query(
        `SELECT * FROM users
        WHERE id = $1`,
        [userId]
    );
};
exports.getPwByEmail = (email) => {
    return db
        .query(
            `SELECT first, last, password, id FROM users
        WHERE email = $1`,
            [email]
        )
        .then(({ rows }) => rows);
};
function updateUser(first, last, email, pw, userId) {
    if (pw) {
        return bc
            .makeHash(pw)
            .then((hashedPw) => {
                return db.query(
                    `UPDATE users SET first=$1, last=$2, email=$3, pw=$4 WHERE id=$5;`,
                    [first, last, email, hashedPw, userId]
                );
            })
            .catch((err) => {
                console.log("ERROR IN DB", err);
            });
    } else {
        return db
            .query(
                `UPDATE users SET first=$1, last=$2, email=$3 WHERE id=$4;`,
                [first, last, email, userId]
            )
            .catch("ERR in updateUser");
    }
}

//// TABLE = user_profiles
exports.addProfile = (userId, age, city, url) => {
    return db.query(
        `INSERT INTO user_profiles (user_id, age, city, url) VALUES ($1, $2, $3, $4) RETURNING id`,
        [userId, age, city, url]
    );
};
function upsertProfile(userId, age, city, websiteURL) {
    return db.query(
        `INSERT INTO user_profiles (user_id, age, city, url) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET age=$2, city=$3, url=$4;`,
        [userId, age, city, websiteURL]
    );
}

//// TABLE = signatures
exports.addSig = (userId, sig) => {
    return db.query(
        `INSERT INTO signatures (user_id, signature, created_at) VALUES ($1, $2, NOW()) RETURNING id`,
        [userId, sig]
    );
};
exports.getSignatureBySigId = (sigId) => {
    return db.query(`SELECT signature FROM signatures WHERE id = $1`, [sigId]);
};

exports.getAmountOfSignatures = () => {
    return db.query(`SELECT COUNT(*) FROM signatures`);
};
exports.deleteSig = (userId) => {
    return db.query("DELETE from signatures WHERE user_id = $1", [userId]);
};
//// TABLE = users JOIN signatures
exports.getSigners = () => {
    return db.query(`SELECT first, last, age, city, url 
FROM users
JOIN signatures    
ON users.id = signatures.user_id
JOIN user_profiles
ON users.id = user_profiles.user_id`);
};
exports.getSignersByCity = (city) => {
    return db.query(
        `SELECT first, last, age, city, url 
FROM users
JOIN signatures    
ON users.id = signatures.user_id
JOIN user_profiles
ON users.id = user_profiles.user_id
WHERE TRIM(LOWER(city)) = LOWER($1);`,
        [city]
    );
};
exports.getSigId = (userId) => {
    // functions as a check to see if a user has already signed the petition
    return db.query(
        `SELECT users.id FROM signatures JOIN users ON signatures.user_id = users.id WHERE signatures.user_id = $1;`,
        [userId]
    );
    // `SELECT EXISTS(SELECT * FROM signatures JOIN users ON signatures.user_id = users.id WHERE signatures.user_id = $1)`,
};
exports.getUserDataById = (userId) => {
    return db.query(
        `SELECT * FROM users
        LEFT JOIN user_profiles
        ON users.id = user_profiles.user_id
        WHERE users.id = $1`,
        [userId]
    );
};
exports.updateProfile = (
    userId,
    first,
    last,
    email,
    pw,
    age,
    city,
    websiteURL
) => {
    return Promise.all([
        updateUser(first, last, email, pw, userId),
        upsertProfile(userId, age, city, websiteURL),
    ]);
};
