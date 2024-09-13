import mongoose from "mongoose";
import { Schema } from "mongoose";

const scoreSchema = new Schema({
  fullName: String,
  birthYear: Number,
  score: Number,
});

const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);

export default Score;
