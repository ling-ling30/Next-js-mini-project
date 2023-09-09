import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "./components/Card";
import { cookies } from "next/headers";
const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Our shared collection",
  description: "shared collection between our user Library",
};

export default async function page() {
  // const books = await prisma.book.findMany();
  const data = await fetch(`http://localhost:3000/api/books`, {
    cache: "no-store",
  });
  const res: Promise<Book[]> = data.json();
  const books = await res;
  // console.log(res);
  return (
    <>
      {cookies().get("accessToken") ? (
        <div className="mx-4 mt-7">
          <Link href="/addbook" className="btn btn-outline btn-info">
            Add Book
          </Link>
        </div>
      ) : null}
      <div className="bg-base-100 flex gap-4 flex-wrap justify-center">
        {books?.map((book: Book) => {
          return <Card key={book.id} {...book} />;
        })}
      </div>
    </>
  );
}
