const nodemailer = require("nodemailer");

const sendEmail = async (payload) => {
  try {
    const { email, subjectLine, bodyHtml } = payload;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OTP_EMAIL,
        pass: process.env.OTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.OTP_EMAIL, // sender address
      to: email,
      subject: subjectLine,
      html: bodyHtml,
    });
    return true;
  } catch (error) {
    console.error("Error while sending email:=>", error);
    return false;
  }
};

module.exports = {
  sendEmail,
};
