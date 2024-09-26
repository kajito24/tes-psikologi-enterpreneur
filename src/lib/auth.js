import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { getJwtSecretKey, USER_TOKEN } from "./constants";
import { cookies } from "next/headers";

/**
 *
 * @param {{fullName: string, birthYear: number}} userData
 * @param {NextResponse} res
 * @returns {Promise<NextResponse>}
 */
export async function setUserCookie(userData, res) {
  const token = await new SignJWT(userData)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  res.cookies.set(USER_TOKEN, token, {
    httpOnly: true,
    maxAge: 60 * 60,
  });

  return res;
}

/**
 * Expires the user token cookie
 * @param {NextResponse} res
 */
export function expireUserCookie(res) {
  res.cookies.set(USER_TOKEN, "", { httpOnly: true, maxAge: 0 });
  return res;
}

/**
 *
 * @param {NextRequest} req
 */
export async function verifyAuth(req) {
  const token = cookies().get(USER_TOKEN);

  if (!token?.value) throw new Error("Missing user token");

  return true;
}
