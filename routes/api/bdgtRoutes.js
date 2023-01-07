const Category = require("../../lib/category");
const Transaction = require("../../lib/transaction");
const User = require("../../lib/User");
const { withAuth } = require("../../utils/auth");
const router = require("express").Router();

router.all('/*', (req, res, next) => {
  withAuth(req, res, next, true);
});

router.post("/transactions", (req, res) => {
  Transaction.create({
    price: req.body.price,
    category_id: req.body.category_id,
    user_id: req.session.user.id
  }).then (newTransaction => {
    res.json(newTransaction);
  }).catch(error => {
    console.error('Create transaction failed', error);
    res.status(400).json({error});
  });
});

router.put("/transactions/:id", (req, res) => {
  Transaction.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then (() => {
    res.json({});
  }).catch(error => {
    console.error('Update transaction failed', error);
    res.status(400).json({error});
  });
});

router.delete("/transactions/:id", (req, res) => {
  Transaction.destroy({
    where: {
      id: req.params.id
    }
  }).then (() => {
    res.json({});
  }).catch(error => {
    console.error('Delete transaction failed', error);
    res.status(400).json({error});
  });
});

router.get("/categories", (req, res) => {
  Category.findAll().then (categories => {
    res.json(categories);
  }).catch(error => {
    console.error('Get categories failed', error);
    res.status(400).json({error});
  });
});

router.get("/transactions", (req, res) => {
  Transaction.findAll({
    include: [
      Category,
    ],
    where: {
      user_id: req.session.user.id,
    }
  }).then (transactions => {
    res.json(transactions);
  }).catch(error => {
    console.error('Get transaction failed', error);
    res.status(400).json({error});
  });
});

module.exports = router;
