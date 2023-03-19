const { Contact } = require("../../models/contact");
const { HttpError } = require("../../lib");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({
    _id: contactId,
    owner: req.user._id,
  });
  if (result) {
    return res.json({
      status: "OK success",
      code: 200,
      data: result,
    });
  }
  throw HttpError(404, `Contact with id ${contactId} not found`);
};

module.exports = getById;
