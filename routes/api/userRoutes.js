const router = require("express").Router();
const { json } = require("../../config/connection");
const User = require("../../lib/User");

router.post("/", async (req, res) => {
  console.log("Sign Up Attempt");
  console.log(req.body);
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.user = {
      id: newUser.id,
      email: newUser.email,
      password: newUser.password,
    };
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  console.log("Login Attempt");
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const validPass = user.checkPassword(req.body.password);

    if (!validPass) {
      res.status(400).json({ message: "Incorrect Password" });
      return;
    }
    console.log("Log In Successful");
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    res.json({ user, message: "You have been logged in!" });
  } catch (err) {
    res.status(400).json({ message: "No user found" });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;