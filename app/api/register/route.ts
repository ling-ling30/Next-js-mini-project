import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
// import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { registerNewUser } from "@/lib/userLogic";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const { name, email, password }: User = await request.json();

  if (!email || !name || !password)
    return NextResponse.json({ message: "Missing required data" });

  const res = await registerNewUser(name, email, password);

  return res;
};
