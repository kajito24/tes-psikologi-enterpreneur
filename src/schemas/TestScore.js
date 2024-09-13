const { model, Schema } = require("mongoose");

const testScoreSchema = new Schema({
  namaLengkap: String,
  tahunLahir: Number,
  skor: Number,
});

const TestScore = model("testScore", testScoreSchema);

module.exports = { TestScore };
