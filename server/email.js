const nodemailer = require("nodemailer");
const keys = require('./keys');

async function sendEmail(assignments) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: keys.emailUser,
            pass: keys.emailPassword
        }
    });

    let year = new Date().getFullYear();
    let success = true;

    for (let assignment of assignments) {
        const mailOptions = {
            from: keys.emailAddress,
            to: assignment.buyerEmail,
            subject: 'Gift Exchange ' + year,
            text: 'Seasons Greetings!',
            html: "<h3>Seasons Greetings " + assignment.buyerName + " !</h3>" +
                "<h4>You will be buying a gift for " + assignment.receiverName + "!</h4>" +
                "<img src=\"cid:reindeer\">",
            attachments: [{
                filename: 'reindeer.png',
                path: './reindeer.png',
                cid: 'reindeer'
            }]
        };

        let result = await transporter.sendMail(mailOptions);

        console.log(result);
        if (result.accepted.length !== 1 || result.rejected.length !== 0) {
            success = false;
            break;
        }
        break;
    }

    return success;
}

module.exports = sendEmail;