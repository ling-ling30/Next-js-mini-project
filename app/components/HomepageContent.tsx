import Link from "next/link";
import React from "react";

export default function HomepageContent() {
  return (
    <div className="hero min-h-screen bg-[url('https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg')]">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link href="/collection" className="btn btn-primary">
            Go To Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
