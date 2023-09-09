import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createBook = async (data: FormData) => {
  try {
    const createdBook = await prisma.book.create({ data: data } as any);
    return NextResponse.json(createdBook);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: "error", message: `${err}` });
  }
};

export const getAllBooks = async () => {
  try {
    // console.log("error<<<<<<<<<<<<<<<<<<<<<<<<");
    const books = await prisma.book.findMany();
    // console.log(books, "<<<<<<<<<<<<<<<<<<<<<<");
    return NextResponse.json(books);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "error", message: `${error}` });
  }
};

export const getBook = async (id: string) => {
  // console.log(id, "<<<<<<<<<<<<<<<<<<<<<<<<");
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    // console.log(book, "<<<<<<<<<<<<<<<<<<<<<<");
    return NextResponse.json({ book });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const editBook = async (id: any, data: any) => {
  try {
    const { title, author, publisher, year, pages, image } = data;
    const editData: any = {};
    if (title) {
      editData.title = title;
    }
    if (author) {
      editData.author = author;
    }
    if (publisher) {
      editData.publisher = publisher;
    }
    if (year) {
      editData.year = Number(year);
    }
    if (pages) {
      editData.pages = Number(pages);
    }
    // console.log(data.image);
    if (image) {
      editData.image = image;
    }

    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: editData,
    });
    return NextResponse.json({ book });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const deleteBook = async (id: string) => {
  try {
    const book = await prisma.book.delete({ where: { id: Number(id) } });
    return NextResponse.json({ status: "success", book });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
