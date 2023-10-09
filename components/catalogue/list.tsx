import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getData, getDataRoomTypes } from "../utils/api";

export default async function RoomList() {
  const data = await getData();
  const typeData = await getDataRoomTypes();

  return (
    <ul className="flex mx-4">
      {data.data.map((room: any) => {
        const type = typeData.data.find((type: any) => type.id === room.id_tipe_kamar);
        if (type) {
          return (
            <li className="list-none mx-10 my-20 rounded-lg shadow-base w-full">
              <div className="ticket px-6 py-4 shadow-lg  flex flex-col md:flex-row rounded-xl gap-x-5">
                <div className="thumbnail">
                  <figure>
                    <Image width={500} height={500} src={type.foto == undefined ? "/assets/luxury-hotel.jpg" : type.foto} alt="kampung warna warni" className="bg-zinc-200 text-center object-cover rounded-xl w-52 h-56" />
                  </figure>
                </div>
                <div className="Desc flex flex-col w-3/4">
                  <div className="title font-bold  md:text-2xl ">{type.nama}</div>
                  <div className="location md:flex flex-row  hidden items-center mt-3 mb-5 gap-x-3">
                    <div className="icons bg-red-200 p-1 rounded-full text-red-600">{/* <PlaceOutlinedIcon /> */}</div>
                    <div className="location text-textDisabled">{room.nomor}</div>
                  </div>
                  <div className="about hidden md:block text-textDisabled">{type.deskripsi}</div>
                </div>
                <div className="prices flex md:flex-col flex-row md:w-1/6 w-full flex-wrap md:justify-center gap-y-4">
                  <div className="prices">
                    <div className="title text-xs font-medium ">Price /night</div>
                    <div className="prices text-md lg:text-xl font-bold text-semiOrange">Rp. {type.harga.toLocaleString()},-</div>
                  </div>

                  <div className="order">
                    <Link href={"catalog/" + room.id}>
                      <button className="btn btn-primary rounded-full w-full">Book</button>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}
