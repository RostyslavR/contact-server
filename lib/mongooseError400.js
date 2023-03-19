const mongooseError400 = (error, data, next) => {
  error.status = 400;
  next();
};
module.exports = mongooseError400;
