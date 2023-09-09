import { deleteBook, editBook, getBook } from "@/lib/bookLogic";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: Props) {
  // const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  const { id } = params;
  const res = await getBook(id);

  return res;
}

export async function PUT(request: Request, { params }: Props) {
  const { id } = params;
  const myFormData = await request.formData();
  // console.log(myFormData);
  const bookData: any = {};
  myFormData.forEach((value, key) => (bookData[key] = value));
  delete bookData.image;
  bookData.year = Number(bookData.year);
  bookData.pages = Number(bookData.pages);

  const file: File | null = myFormData.get("image") as unknown as File;
  // console.log(file);

  if (file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now().toString() + "_" + file.name;
    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const uploadDir = path.join(process.cwd(), `/public/${fileName}`);
    await writeFile(uploadDir, buffer);
    bookData.image = fileName;
  }
  const res = await editBook(id, bookData);
  // console.log(`open ${uploadDir} to see the uploaded file`);

  return res;
}

export async function DELETE(request: Request, { params }: Props) {
  const { id } = params;
  const res = await deleteBook(id);
  return res;
}
