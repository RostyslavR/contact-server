const { HttpError } = require("../../lib");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findOneAndUpdate(
    { _id: user._id },
    {
      verify: true,
      verificationToken: null,
    }
  );

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
