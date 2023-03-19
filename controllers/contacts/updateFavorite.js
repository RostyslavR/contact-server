const { Contact } = require("../../models/contact");
const { HttpError } = require("../../lib");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: req.user._id,
    },
    { favorite },
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

module.exports = updateFavorite;
