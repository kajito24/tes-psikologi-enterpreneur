import { expireUserCookie } from "@/lib/auth";
import { jsonResponse } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

/**
 *
 * @param {NextRequest} req
 */
export function POST(req) {
  return expireUserCookie(jsonResponse(200, { success: true }));
}
