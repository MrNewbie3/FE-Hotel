"use client";
import Link from "next/link";
import React from "react";

export default function AdmNavbar() {
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
              <Link href={"/admin/"}>Room</Link>
            </li>
            <li>
              <Link href={"/admin/type"}>Type</Link>
            </li>
            <li>
              <Link href={"/admin/user"}>User</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">ARTH ROOM MANAGEMENT</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/admin/"}>Room</Link>
          </li>
          <li>
            <Link href={"/admin/type"}>Type</Link>
          </li>
          <li>
            <Link href={"/admin/user"}>User</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end ">
        <button className="btn rounded-full w-12 h-12"></button>
      </div>
    </nav>
  );
}
