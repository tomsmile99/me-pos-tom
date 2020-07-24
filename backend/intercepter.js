const intercepter1 = (req, res, next) => {
  next();
};

const intercepter2 = (req, res, next) => {
  if (req.query.token == "1234") {
    next();
  } else {
    res.end("no authorized");
  }
};
module.exports = { intercepter1, intercepter2 };
