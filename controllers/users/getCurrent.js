const getCurrent = async (req, res) => {
  const { name, email, subscription } = req.user;

  return res.json({ name, email, subscription });
};

module.exports = getCurrent;
