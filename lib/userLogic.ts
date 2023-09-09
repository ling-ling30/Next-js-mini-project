const bcrypt = require("bcrypt");
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { cookies } from "next/headers";
export async function registerNewUser(
  name: string,
  email: string,
  password: any
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return NextResponse.json({ user });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "User already exists" });
  }
}

export async function login(email: string, password: any) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    cookies().set({
      name: "accessToken",
      value: token,
      maxAge: 60 * 60 * 24 * 7,
    });
    return NextResponse.json({ message: "Login Success!", token: token });
  } catch (err) {
    console.log(err);
    NextResponse.json({ message: "Invalid credentials" });
  }
}
