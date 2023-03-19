const fs = require("fs/promises");
const jimp = require("jimp");
const { User } = require("../../models/user");

const { AVATARS_DIR } = require("../../config");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;
    const [extention] = filename.split(".").reverse();
    const avatarName = `${_id}.${extention}`;
    const resultUpload = `${AVATARS_DIR}/${avatarName}`;
    await fs.rename(tempUpload, resultUpload);

    const file = await jimp.read(resultUpload);
    await file.resize(250, 250).write(resultUpload);
    const avatarURL = `/avatars/${avatarName}`;
    const { avatarURL: avatarOldURL } = await User.findOneAndUpdate(
      { _id },
      { avatarURL }
    );

    if (avatarURL !== avatarOldURL) {
      await fs.unlink(`${AVATARS_DIR}/${avatarOldURL.split("/").reverse()[0]}`);
    }

    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
