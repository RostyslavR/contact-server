const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { mongooseError400 } = require("../lib");

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    avatarURL: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", mongooseError400);

const loginSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const mailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const User = model("User", userSchema);

module.exports = { User, loginSchema, mailSchema };
