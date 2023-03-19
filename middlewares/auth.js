const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../config");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw new Error();
    }
    jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    error.message = "Not authorized";
    next(error);
  }
};

module.exports = auth;
