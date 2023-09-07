import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function User() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="flex flex-row flex-wrap gap-x-10 justify-center w-full h-full">
      <div className="card w-80 my-10 bg-base-100 shadow-base">
        <div className="card-body">
          <Image width={500} height={500} src={"https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"} alt={"user.name"} className="w-full h-48 object-cover mb-4 rounded-full" />
          <h2 className="card-title">{"user.name"}</h2>
          <p className="text-gray-600 text-sm mb-4">Email: {"user.email"}</p>
          <p className="text-gray-600 text-sm mb-4">Role: {"user.userRole"}</p>
          <div className="card-actions justify-end">
            <Link href={`/edit-user/${"user.id"}`}>
              <button className="btn bg-blueButton border-none">Edit User</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
