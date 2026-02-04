import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const privateRoutes = ["/krisis"];

async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const payload = await jwtVerify(token, secret);
    return !!payload;
  } catch {
    return false;
  }
}

export default async function middlewate(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth-token")?.value;

  url.pathname = "/login";
  if (privateRoutes.includes(pathname) && !token)
    return NextResponse.redirect(url);

  const isAuth = await verifyToken(token!);
  if (!isAuth) return NextResponse.redirect(url);

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
