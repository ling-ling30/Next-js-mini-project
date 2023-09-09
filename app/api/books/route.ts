import { createBook, getAllBooks } from "@/lib/bookLogic";
import { writeFile } from "fs/promises";
import { join } from "path";
import fs from "fs/promises";
import path from "path";

export const POST = async (request: Request) => {
  const myFormData = await request.formData();
  console.log(myFormData);
  const file: File | null = myFormData.get("image") as unknown as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = Date.now().toString() + "_" + file.name;
  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const uploadDir = path.join(process.cwd(), `/public/${fileName}`);
  await writeFile(uploadDir, buffer);
  console.log(`open ${uploadDir} to see the uploaded file`);

  const bookData: any = {};
  myFormData.forEach((value, key) => (bookData[key] = value));
  bookData.image = fileName;
  bookData.year = Number(bookData.year);
  bookData.pages = Number(bookData.pages);
  // console.log(bookData);

  const res = await createBook(bookData);
  return res;
};

export const GET = async () => {
  const res = await getAllBooks();
  return res;
};
