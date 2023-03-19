const getAll = require("./getAll");
const signUp = require("./signUp");
const resendEmail = require("./resendEmail");
const verifyEmail = require("./verifyEmail");
const login = require("./login");
const updateAvatar = require("./updateAvatar");
const updateSubscription = require("./updateSubscription");
const getCurrent = require("./getCurrent");
const remove = require("./remove");
const deleteUnVerified = require("./deleteUnVerified");
const logout = require("./logout");

module.exports = {
  getAll,
  signUp,
  resendEmail,
  verifyEmail,
  login,
  updateAvatar,
  updateSubscription,
  getCurrent,
  remove,
  deleteUnVerified,
  logout,
};
