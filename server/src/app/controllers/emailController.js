const nodemailer = require("nodemailer");
class EmailController {

    sendEmail(req, res, next) {
        try {
            const { array, content } = req.body;
            const to = array.toString();
            const { subject, text } = content;
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_FROM,
                    pass: process.env.MAIL_PASS,
                }
            });
            let mailDetails = {
                from: process.env.MAIL_FROM,
                to: to,
                subject: subject,
                text: text,
            };

            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
            return res.status(200).json({ checked: true })
        } catch (error) {
            console.error(error);
        }
    }

}
module.exports = new EmailController();
