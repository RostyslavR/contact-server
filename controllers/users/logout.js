const { User } = require("../../models/user");

const loguot = async (req, res) => {
  const { _id } = req.user;
  await User.findOneAndUpdate({ _id }, { token: null });

  return res.status(204).json();
};

module.exports = loguot;
