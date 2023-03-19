const { Contact } = require("../../models/contact");

const create = async (req, res) => {
  const result = await Contact.create({ ...req.body, owner: req.user._id });

  return res.status(201).json({
    status: "Created success",
    code: 201,
    data: result,
  });
};

module.exports = create;
