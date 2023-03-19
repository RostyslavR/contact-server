const { HOST, PORT } = require("../config");

const verificationLetter = (email, verificationToken) => {
  return {
    to: email,
    subject: "Verify email",
    text: "Verfify email",
    html: `<a href=http://${HOST}:${PORT}/users/verify/${verificationToken}>
              Click here to verify your email, please.
           </a>`,
  };
};

module.exports = verificationLetter;
