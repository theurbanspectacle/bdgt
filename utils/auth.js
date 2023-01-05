const withAuthCallback = (req, res, callback, isApi) => {
  if (!req.session.user) {
    if (isApi) {
      res.status(403).json({message: 'You must log in.'})
    } else {
      res.status(403).redirect("/login");
    }
  } else {
    callback();
  }
};

const withAuth = (req, res, next, isApi) => {
  withAuthCallback(req, res, next, isApi);
};

module.exports = {withAuth, withAuthCallback};
