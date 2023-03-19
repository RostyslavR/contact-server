const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { page = 1, limit = 20, favorite } = req.query;
  const filter = { owner: req.user._id };
  if (favorite !== undefined) {
    favorite !== "" ? (filter.favorite = favorite) : (filter.favorite = true);
  }
  const result = await Contact.find(filter, "-createAt -updateAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("owner", "_id email");

  return res.json({
    status: "OK success",
    code: 200,
    data:  result ,
  });
};

module.exports = getAll;
