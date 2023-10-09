import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Delete from "../utils/delete";
import { getDataRoomTypes } from "../utils/api";
import Forbidden from "../utils/forbidden";

export default async function TypeRoom() {
  const data = await getDataRoomTypes();
  if (data === "forbidden") {
    return <Forbidden />;
  }
  return (
    <>
      <div className="flex justify-between mx-16">
        <h1 className="text-lg">Room Type Page's</h1>
        <Link href={"type/new-type"} className="btn btn-neutral">
          Create new room type
        </Link>
      </div>
      <div className="flex flex-row flex-wrap gap-x-10 justify-center w-full h-full">
        {data.data.map((res: any) => (
          <div key={res.id} className="card w-80 my-10 bg-base-100 shadow-base">
            <div className="card-body">
              <Image
                width={500}
                height={500}
                src={!(res.foto == undefined) ? res.foto : "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg"}
                alt={"roomType.className"}
                className="w-full h-48 rounded-md object-cover mb-4"
              />
              <h2 className="card-title">{res.nama}</h2>
              <p className="text-gray-600 text-sm mb-4">Price: Rp {res.harga.toLocaleString()} per night</p>
              <p className="text-gray-600 text-sm mb-4">Count of Rooms: {"roomType.roomCount"}</p>
              <div className="card-actions justify-end">
                <Delete id={res.id} url="types" />
                <Link href={`type/` + res.id}>
                  <button className="btn bg-blueButton border-none">Edit Room Type</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
