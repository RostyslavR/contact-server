const { Contact } = require("../../models/contact");
const { HttpError } = require("../../lib");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  console.log(req.user._id);
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: req.user._id,
    },
    req.body,
    { new: true }
  );

  if (result) {
    return res.json({
      status: "OK success",
      code: 200,
      data: result,
    });
  }

  throw HttpError(404, `Contact with id ${contactId} not found`);
};

module.exports = updateById;
