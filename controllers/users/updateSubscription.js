const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const { email } = await User.findOneAndUpdate(
    { _id },
    { subscription },
    { new: true }
  );

  return res.json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = updateSubscription;
