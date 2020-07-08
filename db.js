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
            `INSERT INTO users (firstname, lastname, email, password, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id`,
            [first, last, email, password]
        )
        .then(({ rows }) => rows);
};
exports.getUser = (userId) => {
    return db
        .query(
            `SELECT firstname, lastname, email, bio, profile_pic_url FROM users where id = $1`,
            [userId]
        )
        .then(({ rows }) => rows);
};
exports.getPwByEmail = (email) => {
    return db
        .query(
            `SELECT password, id FROM users
        WHERE email = $1`,
            [email]
        )
        .then(({ rows }) => rows);
};
exports.addProfilePic = (userId, url) => {
    return db
        .query(
            `UPDATE users SET profile_pic_url = $2 WHERE id = $1 RETURNING profile_pic_url`,
            [userId, url]
        )
        .then(({ rows }) => rows);
};

//// TABLE = reset_codes

exports.addCode = (email, code) => {
    return db
        .query(
            `INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING id`,
            [email, code]
        )
        .then(({ rows }) => rows);
};
