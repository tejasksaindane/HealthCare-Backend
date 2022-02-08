const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("hello world from the server router.js");
});
// ---------------------------------TODO using promises -------------------------------
router.post("/registers", (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(422).json({ error: "Plz fill the fiel property" });
  }
  console.log(name);
  console.log(email);

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "email already exist" });
      }

      const user = new User({ name, email, phone, password });

      user
        .save()
        .then(() => {
          res.status(201).json({ message: "user registered successfully" });
        })
        .catch((err) => res.status(500).json({ error: "registration failed" }));
    })
    .catch((err) => {
      console.log(err);
    });
  //   res.json({ message: req.body });
  //   res.send("mera register page");
});

// --------------------------------------TODO using async-Await ------------------
// router.post("/registers", async (req, res) => {
//   const { name, email, phone, password } = req.body;
//   console.log(">>>>>>>>>>>>>>>>>", req.body);
//   if (!name || !email || !phone || !password) {
//     return res.status(422).json({ error: "Plz fill the field property" });
//   }
//   try {
//     const userExist = await User.findOne({ email: email });
//     if (userExist) {
//       return res.status(422).json({ error: "email already exist" });
//     }

//     const user = new User({ name, email, phone, password });
//     await user.save();

//     res.status(201).json({ message: "user registered successfully" });
//   } catch (err) {
//     console.log(err);
//   }

//   //   console.log(name);
//   //   console.log(email);

//   res.json({ message: req.body });
// });

// ----------------------------------  TODO Login route -------------------------------
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({
          error: "Invalid credentials pass",
        });
      } else {
        res.json({ message: "user signin Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
  //   console.log(req.body);
  //   res.json({message:"awesome"});
});
//About us ka page
router.get("/about", authenticate, (req, res) => {
  console.log(`Hello my about`);
  res.send(req.rootUser);
});
module.exports = router;
