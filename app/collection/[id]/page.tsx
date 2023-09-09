"use client";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Modal from "./component/modal";
const prisma = new PrismaClient();
import type { Metadata } from "next";
import { notFound, useRouter } from "next/navigation";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";
import Swal from "sweetalert2";

type Params = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Params): Promise<Metadata> {
  const data = await fetch(`http://localhost:3000/api/books/${id}`, {
    cache: "no-store",
  });
  const { book } = await data.json();

  if (!book) {
    return {
      title: `Book Not Found`,
    };
  }

  return {
    title: book.title,
    description: `This is detailed page of ${book.title}`,
  };
}

export default async function page({ params: { id } }: Params) {
  // console.log(id);
  const router = useRouter();

  const data = await fetch(`http://localhost:3000/api/books/${id}`, {
    cache: "no-store",
  });
  const { book } = await data.json();
  if (!book) notFound();

  const handleDelete = async () => {
    const deletedBook = await fetch(`http://localhost:3000/api/books/${id}`, {
      method: "DELETE",
    });
    Swal.fire({
      icon: "success",
      title: "Delete success",
      showConfirmButton: false,
      timer: 1500,
    });
    router.push("/collection");
    router.refresh();
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col sm:flex-row">
        <img
          alt="cover"
          src={`http://localhost:3000/${book?.image}`}
          className="max-w-sm rounded-lg shadow-2xl m-4"
        />
        <div className="mx-10">
          <h1 className="text-4xl font-bold mb-10">{book?.title}</h1>
          <p className="py-3">Title : {book?.title}</p>
          <p className="py-3">Author : {book?.author}</p>
          <p className="py-3">Publisher : {book?.publisher}</p>
          <p className="py-3">Year : {book?.year}</p>
          <p className="py-3">pages : {book?.pages}</p>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          {getCookie("accessToken") ? (
            <>
              <Modal data={book} />{" "}
              <button type="button" onClick={handleDelete} className="btn">
                Delete
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const books = await prisma.book.findMany();

  return books.map((book) => ({
    id: book.id.toString(),
  }));
}
