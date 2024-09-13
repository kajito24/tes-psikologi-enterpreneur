const path = require("node:path");
const express = require("express");
const mongoose = require("mongoose");

const { TestScore } = require("./schemas/TestScore");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("src/public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/tes", (req, res) => {
  res.render("tes");
});

app.post("/submit-form", async (req, res) => {
  const body = req.body;

  const score = new TestScore({
    namaLengkap: body.namaLengkap,
    tahunLahir: body.tahunLahir,
    skor: body.skor,
  });

  await score.save();

  res.send("OK");
});

app.listen(3000, async () => {
  mongoose.connect(process.env.MONGO_CONNECTION_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Atlas");
  });

  mongoose.connection.on("error", () => {
    console.log("Error connecting to MongoDB Atlas");
  });

  console.log("App running at http://localhost:3000");
});
