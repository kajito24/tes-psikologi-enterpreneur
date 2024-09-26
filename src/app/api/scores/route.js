import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Score from "@/models/Score";

dbConnect();

export async function GET() {
  const scores = await Score.find().select("-__v");

  return NextResponse.json({ scores });
}

/**
 *
 * @param {Request} req
 */
export async function POST(req) {
  try {
    const res = await req.json();
    const newScore = new Score({
      fullName: res.fullName,
      birthYear: res.birthYear,
      score: res.score,
    });

    await newScore.save();

    return Response.json(res);
  } catch (err) {
    return Response.json(
      { success: false, message: "Body is empty" },
      { status: 400 }
    );
  }
}
