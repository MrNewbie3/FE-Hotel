import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Delete from "../utils/delete";
import { getData, getDataRoomTypes } from "../utils/api";
import Forbidden from "../utils/forbidden";

export default async function Room() {
  const data = await getData();
  const roomTypes = await getDataRoomTypes();
  if (data === "forbidden" || roomTypes === "forbidden") {
    return <Forbidden />;
  }

  return (
    <>
      <div className="flex justify-between mx-16">
        <h1 className="text-lg">Room Page's</h1>
        <Link href={"/admin/room/create"} className="btn btn-neutral">
          Create new room
        </Link>
      </div>
      <div className="flex flex-row flex-wrap gap-x-10 justify-center w-full h-full">
        {data.data.map((res: any, index: number) => {
          const type = roomTypes.data.find((type: any) => type.id === res.id_tipe_kamar);
          if (type) {
            return (
              <div className="card w-80 my-10 bg-base-100 shadow-base" key={index}>
                <div className="card-body">
                  <Image
                    width={500}
                    height={500}
                    src={type.foto != undefined ? type.foto : "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg"}
                    alt={"room.className"}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h2 className="card-title">{res.nomor}</h2>
                  <p className="text-gray-600 text-sm mb-4">Price: ${type.harga.toLocaleString()} per night</p>
                  {/* <p className="text-gray-600 text-sm mb-4">Availability: {type.available ? "Available" : "Not Available"}</p> */}
                  <p className="text-gray-600 text-sm mb-4">Tipe: {type.nama}</p>
                  <div className="card-actions justify-end">
                    <Delete id={res.id} url={"kamar"} />
                    <Link href={`/admin/room/${res.id}`}>
                      <button className="btn bg-blueButton border-none">Edit Room</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </>
  );
}
