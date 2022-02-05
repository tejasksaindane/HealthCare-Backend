require("dotenv").config();
// const mongoose = require("mongoose");
const express = require("express");
const app = express();
// const DB = process.env.DATABASE;
const PORT = process.env.PORT;
require("./db/conn");

//FIXME database
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB CONNECTED");
//   });

// FIXME link the router files
app.use(express.json());
app.use(require("./route/auth"));

// FIXME  Middleware
// const middleware = (req, res, next) => {
//   console.log(`Hello my middleware`);
//   next();
// };
// middleware();

// app.get("/", (req, res) => {
//   res.send("hello world from the server app.js");
// });

// app.get("/about", middleware, (req, res) => {
//   console.log(`Hello my about`);
//   res.send("hello about from the server");
// });

app.get("/contact", (req, res) => {
  res.cookie("Test", "tejas");
  res.send("hello contact from the server");
});

app.get("/signin", (req, res) => {
  res.send("hello login world from the server");
});

app.get("/signup", (req, res) => {
  res.send("hello registration world from the server");
});

console.log("Subscribe to my channel");

app.listen(PORT, () => {
  console.log(`Server is running at port no 8000`);
});

// FIXME mongo atlas
// mongodb+srv://tejas:<password>@cluster0.z4c1w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
