const router = require('express').Router();
const userRoutes = require('./userRoutes');
//TODO: For Back-End Add API Routes! 
router.use('/user', userRoutes);


//Make sure this is last in the code here.
router.use((req, res) => {
    res.status(404).send("404: Route not found.")
});

module.exports = router;