import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getUserByUsername, registerUser } from "@/db/queries";

interface bodyPayload {
  username: string;
  email: string;
  password: string;
}

const saltRounds = 10;

export async function POST(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { username, email, password }: bodyPayload = await req.json();

  if (password.length < 4)
    return NextResponse.json(
      { message: "Password too small" },
      { status: 401 },
    );

  if (await getUserByUsername(username))
    return NextResponse.json(
      { message: "User already exists" },
      { status: 401 },
    );

  let user;
  bcrypt.genSalt(saltRounds, async (err, salt) => {
    bcrypt.hash(password, salt, async (err, bcrypted_password) => {
      await registerUser(username, email, bcrypted_password);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    });
  });
  return;
}
