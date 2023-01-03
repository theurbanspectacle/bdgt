const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bdgtRoutes = require('./bdgtRoutes');
router.use('/user', userRoutes);
router.use('/bdgt', bdgtRoutes);

//Make sure this is last in the code here.
router.use((req, res) => {
    res.status(404).send("404: Route not found.")
});

module.exports = router;