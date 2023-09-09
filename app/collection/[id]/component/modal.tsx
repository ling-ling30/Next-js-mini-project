"use client";
import { editBook } from "@/lib/bookLogic";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

type Props = {
  data: Book;
};

export default function Modal({ data }: Props) {
  // console.log(data);
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [coverPreview, setCoverPreview] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Suubmitt");
    // if (!file) return;
    console.log("Suubmitt");
    const bookData = new FormData(e.currentTarget);
    try {
      // const bookDataObj = Object.fromEntries(bookData.entries());
      // console.log(JSON.stringify(bookDataObj));
      const res = await fetch(`http://localhost:3000/api/books/${data.id}`, {
        method: "PUT",
        body: bookData,
      });
      setFile(undefined);
      // console.log(res);
      router.refresh();
      router.push("/collection");
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setCoverPreview(URL.createObjectURL(file));
      setFile(file);
      console.log(URL.createObjectURL(file), file);
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => {
          const click = document.getElementById("my_modal_3") as any;
          click.showModal();
        }}
      >
        Edit Book
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="flex flex-col items-center modal-box">
          {/* <h1 className=" text-center text-3xl"> Book</h1> */}
          <form
            className=" w-4/5 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <label className="label flex flex-col items-center w-2/4 gap-4">
              <span className="label-text">Title: </span>
              <input
                defaultValue={data.title}
                type="text"
                name="title"
                placeholder="Type title here"
                className="input input-bordered w-full max-w-xs"
              />

              <span className="label-text">Author: </span>
              <input
                defaultValue={data.author}
                type="text"
                name="author"
                placeholder="Type author here"
                className="input input-bordered w-full max-w-xs"
              />

              <span className="label-text">Publisher: </span>
              <input
                defaultValue={data.publisher}
                name="publisher"
                type="text"
                placeholder="Type publisher here"
                className="input input-bordered w-full max-w-xs"
              />

              <span className="label-text">Year: </span>
              <input
                defaultValue={data.year}
                name="year"
                type="text"
                placeholder="Type publish year here"
                className="input input-bordered w-full max-w-xs"
              />

              <span className="label-text">Pages: </span>
              <input
                defaultValue={data.pages}
                name="pages"
                type="text"
                placeholder="Type total pages here"
                className="input input-bordered w-full max-w-xs"
              />

              {/* {coverPreview ? ( */}
              <img
                alt="cover of the book"
                width={200}
                height={300}
                src={coverPreview || `http://localhost:3000/${data.image}`}
              />
              {/* // ) : null} */}

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
      </dialog>
    </>
  );
}
