const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');
const { withAuthCallback } = require('../utils/auth');
router.use('/api', apiRoutes);



// Send file with temporary until handlebar migration
router.get('/', (req, res) => {
  res.render('home', {layout: 'main', welcomeAnimation: true, notLoggedIn: !req.session.user});
});

router.get('/about-us', (req, res) => {
  res.render('about-us', {layout: 'main', notLoggedIn: !req.session.user});
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up', {layout: 'main', notLoggedIn: !req.session.user});
});

router.get('/bdgt', (req, res) => {
  withAuthCallback(req, res, () => {
    res.render('bdgt', {layout: 'main', notLoggedIn: !req.session.user});
  });
});

router.get('/login', (req, res) => {
  res.render('login', {layout: 'main', notLoggedIn: !req.session.user});
});

router.get("/logout", (req, res) => {
  if (typeof req.session.destroy === 'function') {
    req.session.destroy(() => {
      res.status(204).redirect('/');
    });
  } else {
    res.status(204).redirect('/');
  }
});

// This is to handle the 404 CSS & JS files should not be handled.
router.use((req, res, next) => { 
  if (
    !req.path.includes('.css') && 
    !req.path.includes('.js') &&
    !req.path.includes('.jpg')
    ) {
    // Render 404 page here.
    res.status(404).render('404', {layout: 'main'});
  } else {
    next();
  }
});

module.exports = router;