const withAuthCallback = (req, res, callback) => {
  if (!req.session.user) {
    res.status(403).redirect("/login");
  } else {
    callback();
  }
};

const withAuth = (req, res, next) => {
  withAuthCallback(req, res, next);
};

module.exports = {withAuth, withAuthCallback};