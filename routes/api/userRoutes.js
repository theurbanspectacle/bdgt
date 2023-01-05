const router = require("express").Router();
const User = require("../../lib/User");

/**
 * POST /api/user - Create user account and set session cookie
 * BODY:
 * ```
 * {
 *   email: string,
 *   first_name: string,
 *   last_name: string,
 *   password: string,
 * }
 * ```
 */
router.post("/", (req, res) => {
  console.log("Sign Up Attempt");
  console.log(req.body);
  User.create({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  }).then(newUser => {
    req.session.user = {
      id: newUser.id,
      email: newUser.email,
      password: newUser.password,
    };

    res.json({
      id: newUser.id,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name
    });
  }).catch(error => {
    console.error('Create user failed', error);
    res.status(400).json({error});
  });
});

/**
 * POST /api/user/login - Login and set session cookie
 * BODY:
 * ```
 * {
 *   email: string,
 *   password: string,
 * }
 * ```
 * 
 * Return 401 for invalid login attempts.
 */
router.post("/login", (req, res) => {
  console.log("Login Attempt");

  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(user => {
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const validPass = user.checkPassword(req.body.password);

    if (!validPass) {
      res.status(401).json({ message: "Incorrect Password" });
      return;
    }

    console.log("Log In Successful");

    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    res.json({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      },
    });
  }).catch(error => {
    res.status(401).json({ message: "No user found", error });
  });
});

module.exports = router;
