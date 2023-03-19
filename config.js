const path = require("path");

const {
  HOST = "localhost",
  PORT = 3300,
  DB_HOST,
  SG_MAIL,
  SG_API_KEY,
  SECRET_KEY,
} = process.env;

const TMP_DIR = path.join(__dirname, "tmp");
const AVATARS_DIR = path.join(__dirname, "public", "avatars");

module.exports = {
  HOST,
  PORT,
  DB_HOST,
  TMP_DIR,
  SG_MAIL,
  SG_API_KEY,
  SECRET_KEY,
  AVATARS_DIR,
};
