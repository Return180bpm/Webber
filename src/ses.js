const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

/**
 * Sends email with the help of SES (part of AWS).
 * @param {string} to - Email address of the recipirent.
 * @param {string} subject - Subject of the message.
 * @param {string} message - Body of the message.
 */
// exports.sendEmail = function (to, subject, message) {
export const sendEmail = function (to, subject, message) {
    console.log("From inside sendEmail!", to, subject, message);

    return ses
        .sendEmail({
            Source: "Tom Szwaja <dazzling.walkover@spicedling.email>",
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err) => console.log(err));
};
