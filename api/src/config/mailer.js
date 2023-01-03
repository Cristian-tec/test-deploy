// const { User } = require("../models/user");
// const nodemailer = require("nodemailer");

// export const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: "mcburger.pf@gmail.com", // generated ethereal user
//     pass: "txorzsvxhsvibpeo", // generated ethereal password
//   },
// });
// transporter.verify().then(() => {
//   console.log("Ready por send emails.");
// });

// module.exports = { transporter };

//const { transporter } = require("../config/mailer");
// // Mail de bienvenida
// const sendEmail = async (email) => {
//   await transporter.sendMail({
//     from: '"Mc Burger 🍔" <foo@example.com>', // sender address
//     to: email, // list of receivers
//     subject: "Welcome to McBurger!", // Subject line
//     text: "Thank you! We are delighted that you are part of our community" // plain text body
//     html: "<b>When you register you will be sent discounts😊</b>", // html body
//   });
// };

// // Mail decompra exitosa
// if (payment_status === "approved") {
// const sendEmail = async (email) => {
//   await transporter.sendMail({
//     from: '"Mc Burger 🍔" <foo@example.com>', // sender address
//     to: email, // list of receivers
//     subject: "¡Thanks for your purchase!", // Subject line
//     text: "Thank you for choosing us. We are delighted that you are part of our community", // plain text body
//     html: "<b>Enjoy the best flavors 😊</b>", // html body
//   });
// };
// } else if (payment_status === "Cancelled") {

// }

const nodemailer = require("nodemailer");
const { MAIL, MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: MAIL, // generated ethereal user
    pass: MAIL_PASSWORD, // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log("Ready por send emails.");
});

module.exports = { transporter };

/* MAIL= mcburger.pf@gmail.com
MAIL_PASSWORD= txorzsvxhsvibpeo */