const nodemailer = require('nodemailer')
console.log(process.env.MAIL_PASSWORD);

const sendmail = async (subject, to, text, html) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
     
      auth: {
          user: process.env.MAIL_USERNAME,
          pass:process.env.MAIL_PASSWORD
      },
    });


    let info = await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      subject: subject,
      to: to,
      text: text,
      html: html,
    });
    
    console.log("message sent %s", info.messageId)
}


module.exports = sendmail

