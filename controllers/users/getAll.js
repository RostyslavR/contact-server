const { User } = require("../../models/user");

const getAll = async (req, res) => {
  const response = await User.find();
  return res.json(response);
};

module.exports = getAll;
