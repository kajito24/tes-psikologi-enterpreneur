import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Score from "@/models/Score";

dbConnect();

export async function GET() {
  const highScores = await Score.find({ score: { $gt: 79 } }).select("-__v");
  const mediumScores = await Score.find({ score: { $gt: 59, $lt: 79 } }).select(
    "-__v"
  );
  const lowScores = await Score.find({ score: { $gt: 39, $lt: 59 } }).select(
    "-__v"
  );
  const veryLowScores = await Score.find({ score: { $lt: 39 } }).select("-__v");

  const categories = {
    high: highScores,
    medium: mediumScores,
    low: lowScores,
    veryLow: veryLowScores,
  };
  return NextResponse.json({ categories });
}
