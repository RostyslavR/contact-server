const { Schema, model } = require("mongoose");
const Joi = require("joi").extend(require("joi-phone-number"));

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().phoneNumber().required(),
  favorite: Joi.bool(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().phoneNumber(),
  favorite: Joi.bool(),
});

const patchSchema = Joi.object({
  favorite: Joi.bool()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

const Contact = model("Contact", contactSchema);

module.exports = {
  Contact,
  createSchema,
  updateSchema,
  patchSchema,
};
