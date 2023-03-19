const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { HttpError, sendEmail, verificationLetter } = require("../../lib");
const { User } = require("../../models/user");

const { SECRET_KEY } = require("../../config");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = user.verify
    ? jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "40h" })
    : null;

  req.query.sendmail &&
    (await sendEmail(verificationLetter(email, user.verificationToken)));

  const { subscription, name, avatarURL } = await User.findOneAndUpdate(
    { _id: user._id },
    { token }
  );

  return res.json({
    token,
    user: {
      name,
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = login;
