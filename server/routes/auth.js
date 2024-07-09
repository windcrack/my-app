const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.create({ username, password }, (err, result) => {
    if (err) return res.status(500).send("Error registering new user.");
    res.status(200).send("User registered.");
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ username: req.user.username, role: req.user.role });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send("Logged out.");
});

router.get("/current_user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ username: req.user.username, role: req.user.role });
  } else {
    res.status(401).send("Not authenticated");
  }
});

module.exports = router;
