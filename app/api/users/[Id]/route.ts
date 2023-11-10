import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server"

export async function GET(req, context: { params }) {
    const userId = context.params.Id

    const users = await prisma.user.findUnique({where : {Id: Number(userId)}});
    return NextResponse.json(users);
  }

export async function DELETE(req, context: { params }) {
   const postId = context.params.Id;
     const post = await prisma.user.delete({
       where: { Id: Number(postId) },
     });
    return NextResponse.json(post);
  }