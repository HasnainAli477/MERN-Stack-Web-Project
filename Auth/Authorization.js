const Authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.send(`${req.user.role} is not allowed to perform this action`);
      return res.redirect("/");
    }
    next();
  };
};

module.exports = Authorization;
