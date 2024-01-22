const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const cors = require("cors");
const app = express();
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const templatePath = path.join(__dirname, "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", templatePath);
app.use(express.static("public"));
app.use(cors());

app.use(taskRoutes);
app.use(authRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/front/index.html");
});

mongoose
  .connect("mongodb://localhost:27017/tasktracker")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("TaskTracker API app is running on port 3000");
});
