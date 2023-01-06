const withAuthCallback = (req, res, callback, isApi) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    callback();
  }
};

const withAuth = (req, res, next, isApi) => {
  withAuthCallback(req, res, next, isApi);
};

module.exports = { withAuth, withAuthCallback };
