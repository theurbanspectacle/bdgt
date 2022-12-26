const router = require('express').Router();

//TODO: For Back-End Add API Routes! 


//Make sure this is last in the code here.
router.use((req, res) => {
    res.status(404).send("404: Route not found.")
});

module.exports = router;