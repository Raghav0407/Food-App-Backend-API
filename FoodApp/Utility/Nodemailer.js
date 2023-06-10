
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function sendMail(str,data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'raghavgarg4702@gmail.com', // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });


  var oSubject, oText, Ohtml;
  if(str=='signup'){
    oSubject=`Thanks for signing up ${data.name}`;
    Ohtml=`
    <h1>Welcome to Food App</h1>
    Hopw you have a good time!
    Here are your details,
    Name:-${data.name}
    Email:-${data.email}
    `
  }
  else if(str=='resetpassword'){
    oSubject=`Reset Password`;
    Ohtml=`
    <h1>Welcome to Food App</h1>
    Hopw you have a good time!
    Here is your link to reset your password
    ${data.resetPasswordLink}
    `
  }
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo Food App👻"raghavgarg47022gmail.com"', // sender address
    to: data.email, // list of receivers
    subject: oSubject, // Subject line
    text: "Hello bro", // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
