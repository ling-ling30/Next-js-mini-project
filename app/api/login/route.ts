import { login } from "@/lib/userLogic";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { email, password }: User = await request.json();
  const res = await login(email, password);

  return res;
};
