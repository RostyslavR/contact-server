const { HttpError } = require("../../lib");
// const { HttpError, sendEmail, verificationLetter } = require("../../lib");
const { User } = require("../../models/user");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  // await sendEmail(verificationLetter(email, user.verificationToken));

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
