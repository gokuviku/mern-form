import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail=async (options)=>{
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Authentication System",
            link: process.env.FRONTEND_URL
        }
    })

    const emailTextual= mailGenerator.generatePlaintext(options.mailgenContent)

    const emailHTML=mailGenerator.generate(options.mailgenContent)

    const transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USERNAME,
            pass:process.env.SMTP_PASSWORD
        }
    })

    const mail={
        from:process.env.SMTP_FROM_EMAIL,
        to:options.email,
        subject:options.subject,
        text:emailTextual,
        html:emailHTML
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.log("Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file");
        console.log("Error: ", error);
    }
}

const forgotPasswordMailgenContent=async (username, resetUrl)=>{
 return {
    body:{
        name:username,
        intro: "we have requested to reset your password.",
        action:{
            instruction:"To reset your password please click on the following button : ",
            button:{
                color: "#22BC66",
                text:"Reset Your Password",
                link:resetUrl
            },
            outro:"Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }}
}


export {
    sendEmail,
    forgotPasswordMailgenContent
}