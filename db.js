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
            `INSERT INTO users (firstname, lastname, email, password, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id `,
            [first, last, email, password]
        )
        .then(({ rows }) => rows);
};
exports.getUser = (userid) => {
    return db
        .query(
            `SELECT id , firstname, lastname, email, bio, profile_pic_url FROM users where id = $1`,
            [userid]
        )
        .then(({ rows }) => rows);
};
exports.getNewestUsers = (limit) => {
    return db
        .query(
            `SELECT id , firstname, lastname, profile_pic_url FROM users ORDER BY ID DESC LIMIT $1;`,
            [limit]
        )
        .then(({ rows }) => rows);
};
exports.findUsers = (querystring) => {
    return db
        .query(
            `SELECT id , firstname, lastname, profile_pic_url FROM users WHERE firstname ILIKE $1 OR lastname ILIKE $1 OR bio ILIKE $1;`,
            ["%" + querystring + "%"]
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
exports.updatePassword = (email, password) => {
    return db
        .query(`UPDATE users SET password = $2 WHERE email = $1`, [
            email,
            password,
        ])
        .then(({ rows }) => rows);
};
exports.updateBio = (userid, newBio) => {
    return db
        .query(`UPDATE users SET bio = $2 WHERE id = $1`, [userid, newBio])
        .then(({ rows }) => rows);
};
exports.addProfilePic = (userid, url) => {
    return db
        .query(
            `UPDATE users SET profile_pic_url = $2 WHERE id = $1 RETURNING profile_pic_url`,
            [userid, url]
        )
        .then(({ rows }) => rows);
};

//// TABLE = friend_requests
exports.getFriends = (userid) => {
    console.log("#userid:", userid);

    return db
        .query(
            `SELECT users.id , firstname, lastname, profile_pic_url, accepted, updated_at
    FROM friend_requests
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND requester_id = users.id )
    OR (accepted = true AND recipient_id = $1 AND requester_id = users.id )
    OR (accepted = true AND requester_id = $1 AND recipient_id = users.id )
    ORDER BY updated_at DESC
`,
            [userid]
        )
        .then(({ rows }) => rows);
};
exports.getFriendshipStatus = (senderid, recipientid) => {
    console.log("inside db", senderid, recipientid);

    return db
        .query(
            `SELECT accepted, recipient_id FROM friend_requests
        WHERE (requester_id = $1 
        AND recipient_id = $2)
        OR (requester_id = $2 
        AND recipient_id = $1)
        `,
            [senderid, recipientid]
        )
        .then(({ rows }) => rows);
};
exports.makeFriendshipRequest = (senderid, recipientid) => {
    return db
        .query(
            `INSERT INTO friend_requests (requester_id, recipient_id, accepted) VALUES ($1, $2, FALSE)`,
            [senderid, recipientid]
        )
        .then(({ rows }) => rows);
};

exports.acceptFriendship = (senderid, recipientid) => {
    return db
        .query(
            `UPDATE friend_requests SET accepted = TRUE, updated_at = CURRENT_TIMESTAMP WHERE (requester_id = $1 
        AND recipient_id = $2)
        OR (requester_id = $2 
        AND recipient_id = $1)`,
            [senderid, recipientid]
        )
        .then(({ rows }) => rows);
};
exports.rejectFriendship = (senderid, recipientid) => {
    return db
        .query(
            `DELETE FROM friend_requests WHERE (requester_id = $1 
        AND recipient_id = $2)
        OR (requester_id = $2 
        AND recipient_id = $1)`,
            [senderid, recipientid]
        )
        .then(({ rows }) => rows);
};

//// TABLE = reset_codes

exports.addCode = (email, code) => {
    return db
        .query(
            `INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING id `,
            [email, code]
        )
        .then(({ rows }) => rows);
};
exports.checkCode = (codeUser) => {
    return db
        .query(
            `SELECT code FROM reset_codes
        WHERE code = $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`,
            [codeUser]
        )
        .then(({ rows }) => rows);
};

/// TABLE = chat_messages

exports.addMessage = (userId, messageText) => {
    return db
        .query(
            `INSERT INTO chat_messages (user_id, message_text) VALUES ($1, $2) RETURNING id, to_char(created_at::timestamp, 'HH:MI:SS') AS created_at, message_text`,
            [userId, messageText]
        )
        .then(({ rows }) => rows[0]);
};
exports.getNewestMessages = (limit) => {
    // DD Mon YYYY HH:MI:SSPM
    return db
        .query(
            `SELECT chat_messages.id, to_char(chat_messages.created_at::timestamp, 'HH:MI:SS') AS created_at, message_text, firstname, lastname, profile_pic_url FROM chat_messages JOIN users ON 
            chat_messages.user_id = users.id
            ORDER BY chat_messages.id DESC LIMIT $1;`,
            [limit]
        )
        .then(({ rows }) => rows);
};
