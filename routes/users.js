const express = require("express");
const { tryToDo } = require("../lib");
const { validate, auth, upload } = require("../middlewares");
const { loginSchema, mailSchema } = require("../models/user");
const {
  signUp,
  login,
  verifyEmail,
  getCurrent,
  logout,
  remove,
  deleteUnVerified,
  updateSubscription,
  updateAvatar,
  getAll,
  resendEmail,
} = require("../controllers/users");

const router = express.Router();

router.get("/", tryToDo(getAll));

router.post("/verify", validate(mailSchema), tryToDo(resendEmail));

router.get("/verify/:verificationToken", tryToDo(verifyEmail));

router.post("/signup", validate(loginSchema), tryToDo(signUp));

router.post("/login", validate(loginSchema), tryToDo(login));

router.get("/current", auth, tryToDo(getCurrent));

router.get("/logout", auth, tryToDo(logout));

router.patch("/subscription", auth, tryToDo(updateSubscription));

router.patch("/avatars", auth, upload.single("avatar"), tryToDo(updateAvatar));

router.delete("/remove", auth, tryToDo(remove));

router.delete("/deleteUnVerified", tryToDo(deleteUnVerified));

module.exports = router;
