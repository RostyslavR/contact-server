const { User } = require("../../models/user");

const deleteUnVerified = async (req, res) => {
  const fiveDays = new Date();
  const response = await User.deleteMany({
    verify: false,
    createdAt: { $lt: fiveDays.setDate(fiveDays.getDate() - 5) },
  });

  return res.json(response);
};
module.exports = deleteUnVerified;
