import Image from "next/image";
import Link from "next/link";
import React from "react";
import Delete from "../utils/delete";
import { getDataUser } from "../utils/api";
import Forbidden from "../utils/forbidden";

export default async function User() {
  const data = await getDataUser();
  if (data === "forbidden") {
    return <Forbidden />;
  }
  return (
    <>
      <div className="flex justify-between mx-16">
        <h1 className="text-lg">User Page's</h1>
        <Link href={"user/new-user"} className="btn btn-neutral">
          Create new user
        </Link>
      </div>
      <div className="flex flex-row flex-wrap gap-x-10 justify-center w-full h-full">
        {data.data.map((user: any) => {
          return (
            <div key={user.id} className="card w-80 my-10 bg-base-100 shadow-base">
              <div className="card-body">
                <Image
                  width={500}
                  height={500}
                  src={!(user.foto === "undefined") ? user.foto : "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"}
                  alt={user.name}
                  className="w-full h-48 object-cover mb-4 rounded-full"
                />
                <h2 className="card-title capitalize">{user.nama}</h2>
                <p className="text-gray-600 text-sm mb-4">Email: {user.email}</p>
                <p className="text-gray-600 text-sm mb-4">Role: {user.role}</p>
                <div className="card-actions justify-end">
                  <Delete id={user.id} url="user" />
                  <Link href={`user/${user.id}`}>
                    <button className="btn bg-blueButton border-none">Edit User</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
