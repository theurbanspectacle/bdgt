const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');
router.use('/api', apiRoutes);



// Send file with temporary until handlebar migration
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

router.get('/about-us', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

router.get('/sign-up', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

router.get('/budget', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

// This is to handle the 404 CSS & JS files should not be handled.
router.use((req, res, next) => { 
  if (
    !req.path.includes('.css') && 
    !req.path.includes('.js') 
    ) {
    // Render 404 page here.
    res.status(404).sendFile('index.html', { root: path.join(__dirname, '../public') });
  } else {
    next();
  }
});

module.exports = router;