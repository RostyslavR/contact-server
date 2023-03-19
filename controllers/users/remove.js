const { User } = require("../../models/user");

const remove = async (req, res) => {
  const { _id } = req.user;
  await User.findOneAndDelete({ _id });

  return res.status(204).json();
};

module.exports = remove;
