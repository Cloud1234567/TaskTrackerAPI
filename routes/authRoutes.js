const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const validateUser = require("../validate/validate");
const validateToken = require("../validate/validateTokenRoute");
const isAdmin = require("../validate/isAdmin");

const path = require("path");

const router = express();

//register

router.get("/", async (req, res) => {
  res.render("index.ejs");
});
router.get("/register", async (req, res) => {
  res.render("register.ejs");
});
router.post("/register", async (req, res) => {
  try {
    const { username, password, name, email, age, isAdmin } = req.body;

    const newUser = await User.create({
      username,
      password,
      name,
      email,
      age,
      isAdmin: isAdmin[1],
    });
    res.status(200).json({ message: "Register Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/login", async (req, res) => {
  res.render("login.ejs");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

function generateAuthToken(user) {
  try {
    const token = jwt.sign({ _id: user._id, username: user.username }, "10");
    return token;
  } catch (error) {
    console.log();
  }
}

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = generateAuthToken(user);

    res.status(200).json({ token });
    // res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

router.get("/profile/:id", validateToken(), async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findById(id).select({
      _id: 0,
      username: 1,
      name: 1,
      email: 1,
      age: 1,
    });
    res.json(findUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

router.patch("/profile/:id", validateToken(), isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findByIdAndUpdate(id, req.body);

    if (!findUser) {
      return res
        .status(404)
        .json({ message: `cannot find any tasks with ID ${id}` });
    }
    res.status(200).json(findUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
