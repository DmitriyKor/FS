import nodemailer from 'nodemailer';

//https://www.freecodecamp.org/news/create-a-send-email-function-using-nodemailer-and-oauth2/

const creatEmailTransport = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "dmytrok251@gmail.com",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        },
    });
}

var transporter = null;

export const sendEmail = async (recipients, subject, text, html) => {
    
    if (!transporter) {transporter = creatEmailTransport()}//create later to let environmental variables to be set
    
    try {
        await transporter.verify();
        console.log("Server is ready to take our messages");

        const info = await transporter.sendMail({
            from: 'dmytrok251@gmail.com', // sender address
            to: recipients, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });

        console.log("Message sent: %s", info.messageId);
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail", err);
    }
};



