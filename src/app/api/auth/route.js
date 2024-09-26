import { NextRequest, NextResponse } from "next/server";
import { setUserCookie } from "@lib/auth";
import { jsonResponse } from "@/lib/utils";

/**
 *
 * @param {NextRequest} req
 */
export async function POST(req) {
  const body = await req.json().catch((err) => {
    console.error("Error while parsing request json", err);

    return NextResponse.json(
      { error: { message: "Something is wrong with your request body" } },
      { status: 400 }
    );
  });

  if (!body.fullName || !body.birthYear)
    return jsonResponse(400, { error: { message: "Invalid body" } });

  return await setUserCookie(body, jsonResponse(200, { success: "true" }));
}
