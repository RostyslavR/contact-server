const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SG_MAIL, SG_API_KEY } = require("../config");

sgMail.setApiKey(SG_API_KEY);

const sendEmail = async (letter) => {
  await sgMail.send({ ...letter, from: SG_MAIL });
  return true;
};

module.exports = sendEmail;
