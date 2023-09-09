"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { createBook } from "../../../lib/bookLogic";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookForm() {
  const [file, setFile] = useState<File>();
  const [coverPreview, setCoverPreview] = useState("");
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setCoverPreview(URL.createObjectURL(file));
      setFile(file);
      // console.log(URL.createObjectURL(file), file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    console.log("submitted");
    try {
      const bookData = new FormData(e.currentTarget);
      console.log(bookData);
      const res = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        body: bookData,
      });
      setFile(undefined);
      router.push("/collection");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-center text-3xl">Create Book</h1>
      <form
        className=" w-4/5 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <label className="label flex flex-col items-center w-2/4 gap-4">
          <span className="label-text">Title: </span>
          <input
            type="text"
            name="title"
            placeholder="Type title here"
            className="input input-bordered w-full max-w-xs"
          />

          <span className="label-text">Author: </span>
          <input
            type="text"
            name="author"
            placeholder="Type author here"
            className="input input-bordered w-full max-w-xs"
          />

          <span className="label-text">Publisher: </span>
          <input
            name="publisher"
            type="text"
            placeholder="Type publisher here"
            className="input input-bordered w-full max-w-xs"
          />

          <span className="label-text">Year: </span>
          <input
            name="year"
            type="text"
            placeholder="Type publish year here"
            className="input input-bordered w-full max-w-xs"
          />

          <span className="label-text">Pages: </span>
          <input
            name="pages"
            type="text"
            placeholder="Type total pages here"
            className="input input-bordered w-full max-w-xs"
          />

          {coverPreview ? (
            <Image
              alt="cover of the book"
              width={200}
              height={300}
              src={coverPreview}
            />
          ) : null}

          <span className="label-text">Cover Image: </span>
          <input
            name="image"
            onChange={handleChange}
            type="file"
            className="file-input w-full max-w-xs"
          />
        </label>
        <button className="btn" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
}
