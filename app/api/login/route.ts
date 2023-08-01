import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const isPasswordMatch = await bcrypt.compare(password, user?.hashedPassword||"");

  if (!isPasswordMatch) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
//   const sessionToken = uuid();

//   const cookieOptions = {
//     httpOnly: true, // The cookie cannot be accessed via JavaScript (security measure)
//     secure: process.env.NODE_ENV === "production", // Set to true in production to enforce HTTPS-only cookie
//     maxAge: 30 * 24 * 60 * 60, // Expiry time in seconds (30 days)
//     path: "/", // Set the path to "/" to ensure the cookie is accessible across the entire domain
//   };

//   const userData = JSON.stringify(user);
//   NextResponse.("Set-Cookie", [
//     serialize("sessionToken", sessionToken, cookieOptions),
//     serialize("userData", userData, cookieOptions),
//   ]);

  return NextResponse.json( user );
}
