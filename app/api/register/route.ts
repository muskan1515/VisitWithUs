import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/lib/prismadb";

export async function POST(
  request: Request
) {
  const body = await request.json();
  const { 
    email,
    name,
    password,
   } = body;

   if (!email || !password || !name ){
    return new Response(
      JSON.stringify({
        msg:"Invalid Credentials",
      }),
      {
        status: 403,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
        },
      }
    )
    }

    const userData = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (userData ) {
      return new Response(
        JSON.stringify({
          name: 'Email already exists',
        }),
        {
          status: 403,
          headers: {
            'content-type': 'application/json',
            'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
          },
        }
      )
    }

   const hashedPassword = await bcrypt.hash(password, 12);

   const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    }
  });

  return NextResponse.json(user);
}