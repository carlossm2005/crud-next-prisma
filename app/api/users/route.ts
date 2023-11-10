import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
export async function POST(request: Request) {
  try {
    const json = await request.json();

    const user = await prisma.user.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(user), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("User with email already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const json = await request.json();
    console.log(json)
     const post = await prisma.user.update({
       where: { Id: json.Id },
       data: json
     });

    return new NextResponse(JSON.stringify(json), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("User with email already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}
