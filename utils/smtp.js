const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const { BRANDING } = require("@config");

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: false,
    auth: {
        user: process.env.MAILER_AUTH_USER,
        pass: process.env.MAILER_AUTH_PASS,
    }
});

const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: `"${BRANDING.name}" ${process.env.MAILER_FROM}`,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


module.exports = { sendEmail };