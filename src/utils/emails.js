import config from "../config"
import nodemailer from "nodemailer"

export const sendEmail = async (sentTo,subject,text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASSWORD
        }  });
    const mailOptions = {
        from: config.EMAIL_USER,
        to: sentTo,
        subject: subject,
        text: text
    };
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}