"use client";
import Image from "next/image";
import HomepageContent from "./components/HomepageContent";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/fetch/users";
import useAuthStore from "@/zustand/userStore";
import Toast from "./components/Toast";
import Link from "next/link";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { token, setToken, isLoggedIn, login, logout } = useAuthStore();
  // check if token is available in local cookies
  useEffect(() => {
    const storedToken = getCookie("accessToken");
    // router.refresh();

    // const storedToken = window.localStorage.getItem("token");

    // if (storedToken) {
    //   setToken(storedToken);
    // } else {
    //   setToken("");
    //   logout();
    // }
  }, [token, router, setToken, isLoggedIn, login, logout]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res: Promise<any> = getToken(email, password);

    try {
      console.log("clicked", email, password);
      const data = await res;
      // console.log(data);
      if (!data.token) {
        setError(data.message);
        throw new Error(`${data.message}`);
      } else {
        window.localStorage.setItem("token", JSON.stringify(data.token));
        setToken(data.token);
        login();
        router.refresh();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return token ? (
    <HomepageContent />
  ) : (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
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
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <Link
                  href="/register"
                  className="label-text-alt link link-hover"
                >
                  do not have an account?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
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
