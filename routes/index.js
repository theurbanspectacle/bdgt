const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');
router.use('/api', apiRoutes);



// Send file with temporary until handlebar migration
router.get('/', (req, res) => {
  res.render('home', {layout: 'main', welcomeAnimation: true});
});

router.get('/about-us', (req, res) => {
  res.render('about-us', {layout: 'main'});
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up', {layout: 'main'});
});

router.get('/bdgt', (req, res) => {
  res.render('bdgt', {layout: 'main'});
});

router.get('/login', (req, res) => {
  res.render('login', {layout: 'main'});
});

// This is to handle the 404 CSS & JS files should not be handled.
router.use((req, res, next) => { 
  if (
    !req.path.includes('.css') && 
    !req.path.includes('.js') 
    ) {
    // Render 404 page here.
    res.status(404).render('404', {layout: 'main'});
  } else {
    next();
  }
});

module.exports = router;