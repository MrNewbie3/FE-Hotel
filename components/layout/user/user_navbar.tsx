"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const UsrNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear user session or call logout API
    deleteCookie("token");
    deleteCookie("is_active");
    // After successful logout, redirect user to login page
    router.push("/login");
  };

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href={"/user/"}>Home</Link>
            </li>
            <li>
              <Link href={"/user/catalog"}>Catalog</Link>
            </li>
            <li>
              <Link href={"/user/history"}>History</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">ARTH ROOM</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/user/"}>Home</Link>
          </li>
          <li>
            <Link href={"/user/catalog"}>Catalog</Link>
          </li>
          <li>
            <Link href={"/user/history"}>History</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <button onClick={(e) => handleLogout()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UsrNavbar;
