import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getUserByUsername } from "@/db/queries";
import { SignJWT } from "jose";

interface bodyPayload {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const data: bodyPayload = await req.json();
  const username = data.username.trim().toLowerCase();
  const password = data.password.trim();
  const user = await getUserByUsername(username);
  const partialUser = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  if (username === "")
    return NextResponse.json(
      { message: "User must be defined" },
      { status: 422 },
    );

  if (!(await bcrypt.compare(password, user.bcrypted_password)))
    return NextResponse.json(
      { message: "Incorrect password" },
      { status: 401 },
    );

  const response = NextResponse.json(
    {
      message: "Login successful",
      user: partialUser,
    },
    { status: 200 },
  );
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const token = await new SignJWT(partialUser)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(secret);

  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return response;
}
