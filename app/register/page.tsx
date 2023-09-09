"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (data.message) {
        setError(data.message);
      } else {
        router.push("/");
      }
      // return data;
    } catch (error) {}
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <h1 className="text-5xl font-semibold m-5">REGISTER</h1>
          <label className="label">
            <span className="label-text">Name: </span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered"
          />

          <label className="label">
            <span className="label-text">Email: </span>
          </label>
          <input
            name="email"
            type="text"
            placeholder="email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password: </span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="password"
            className="input input-bordered"
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>{" "}
      {error ? (
        <div
          onClick={() => {
            console.log(`clicked`);
            setError(null);
          }}
          className="toast toast-top toast-center"
        >
          <div
            onClick={() => {
              console.log(`clicked`);
              setError(null);
            }}
            className="alert alert-error"
          >
            <span
              onClick={() => {
                console.log(`clicked`);
                setError(null);
              }}
            >
              {error}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
