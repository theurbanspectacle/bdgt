const router = require("express").Router();

// TODO: Add BDGT API ROUTES
router.post("/purchase", (req, res) => {
  if (req.session.user) {
    savePurchase(req.body.purchase, req.session.user.id);
    res.send("Purchase Saved!");
  } else {
    res.status(401).json({ message: "Unable to save purchase" });
    return;
  }
});
router.post("/income", (req, res) => {});

module.exports = router;
