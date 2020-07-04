const bcrypt = require("bcryptjs");
let { genSalt, hash, compare } = bcrypt;
const { promisify } = require("util");

genSalt = promisify(genSalt);
hash = promisify(hash);
compare = promisify(compare);

exports.makeHash = pw => {
    return genSalt()
        .then(salt => {
            return hash(pw, salt);
        })
        .catch(err => {
            console.log("Something went wrong with the hashing!", err);
        });
};

exports.compare = compare;
