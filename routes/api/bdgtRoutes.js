const Purchase = require("../../lib/purchase");
const User = require("../../lib/User");
const router = require("express").Router();

// TODO: Add BDGT API ROUTES
router.post("/purchase", (req, res) => {
  Purchase.create({
    price: req.body.price,
  });

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
