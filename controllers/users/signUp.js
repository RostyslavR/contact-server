const download = require("download");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { HttpError, sendEmail, verificationLetter } = require("../../lib");
const { User } = require("../../models/user");

const { AVATARS_DIR } = require("../../config");

const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hash = bcrypt.hashSync(password, 10);

  const verificationToken = uuidv4();

  const gravatarURL = `http:${gravatar.url(email, { s: "250" })}`;
  await download(gravatarURL, AVATARS_DIR);
  const avatarName = `${gravatarURL.split("/").reverse()[0].split("?")[0]}.jpg`;
  const avatarURL = `/avatars/${avatarName}`;

  const { subscription } = await User.create({
    name,
    email,
    password: hash,
    verificationToken,
    avatarURL,
  });

  await sendEmail(verificationLetter(email, verificationToken));

  return res.status(201).json({
    user: {
      name,
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = signUp;
