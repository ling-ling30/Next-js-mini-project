import Image from "next/image";
import Link from "next/link";

export function Card({
  id,
  title,
  author,
  image,
  publisher,
  year,
  pages,
}: Book) {
  return (
    <Link
      href={`/collection/${id}`}
      className="card w-96 bg-base-100 shadow-xl"
    >
      <figure className="px-10 pt-10">
        <img
          alt={`${title}'s Cover`}
          src={`http://localhost:3000/${image}`}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>
          Published by : {author}
          <br />
          Written by : {author} || Pages :{pages}
        </p>
        <div className="card-actions"></div>
      </div>
    </Link>
  );
}
