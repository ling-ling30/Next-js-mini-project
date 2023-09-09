"use client";
import useAuthStore from "@/zustand/userStore";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, login, logout } = useAuthStore();

  const handleLogOut = () => {
    // window.localStorage.removeItem("token");
    deleteCookie("accessToken");
    setToken("");
    logout();
    router.refresh();
  };

  useEffect(() => {
    // const storedToken = window.localStorage.getItem("token");
    const storedToken = getCookie("accessToken");
    if (storedToken) {
      setToken(storedToken);
      login();
      console.log("useEffect Navbar");
    }
  }, [token, isLoggedIn, login, logout]);

  return (
    <div className="flex justify-between navbar bg-base-100">
      <div className="flex place">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          LOGO
        </Link>
      </div>
      <div className="flex justify-end">
        <ul className="flex gap-4 px-1">
          <li>
            <Link className=" mx-4" href="/collection">
              Collection
            </Link>
          </li>
          {token ? (
            <li>
              {" "}
              <button
                type="submit"
                onClick={handleLogOut}
                className="text-red-600"
              >
                Log Out
              </button>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
