"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RoomList() {
  return (
    <div className="flex mx-4">
      <div className="sorter-maps w-fit">
        <div className="destination-dropdown bg-buttonDisabled w-56 p-4 rounded-xl">
          <div className="title text-xl font-semibold mb-5">Pilihan Destinasi</div>
          <div className="select-form">
            <form className="flex flex-col gap-y-3">
              <div className="option-wrapper flex flex-row items-center gap-x-4">
                <input type="radio" id="Desa Wisata" name="fav_language" onChange={() => {}} value="Desa Wisata" checked />
                <label htmlFor="Desa Wisata">Desa Wisata</label>
              </div>
              <div className="option-wrapper flex flex-row items-center gap-x-4">
                <input type="radio" id="RM" name="fav_language" onChange={() => {}} value="Rumah Makan" />
                <label htmlFor="RM">Rumah Makan</label>
              </div>
              <div className="option-wrapper flex flex-row items-center gap-x-4">
                <input type="radio" id="Situs" name="fav_language" onChange={() => {}} value="Situs" />
                <label htmlFor="Situs">Situs</label>
              </div>
              <div className="option-wrapper flex flex-row items-center gap-x-4">
                <input type="radio" id="Museum" name="fav_language" onChange={() => {}} value="Museum" />
                <label htmlFor="Museum">Museum</label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <li className="list-none mx-10 my-20 rounded-lg shadow-base w-full">
        <div className="ticket px-6 py-4 shadow-lg  flex flex-col md:flex-row rounded-xl gap-x-5">
          <div className="thumbnail">
            <figure>
              <Image width={500} height={500} src={"/assets/luxury-hotel.jpg"} alt="kampung warna warni" className="bg-zinc-200 text-center object-cover rounded-xl w-52 h-56" />
            </figure>
          </div>
          <div className="Desc flex flex-col w-3/4">
            <div className="title font-bold  md:text-2xl ">name</div>
            <div className="location md:flex flex-row  hidden items-center mt-3 mb-5 gap-x-3">
              <div className="icons bg-red-200 p-1 rounded-full text-red-600">{/* <PlaceOutlinedIcon /> */}</div>
              <div className="location text-textDisabled">location</div>
            </div>
            <div className="about hidden md:block text-textDisabled">Hotel room description</div>
          </div>
          <div className="prices flex md:flex-col flex-row md:w-1/6 w-full flex-wrap md:justify-center gap-y-4">
            <div className="prices">
              <div className="title text-xs font-medium ">Price /night</div>
              <div className="prices text-md lg:text-xl font-bold text-semiOrange">Rp. 10000,-</div>
            </div>

            <div className="order">
              <Link href={"catalog/searchkey"}>
                <button className="btn btn-primary rounded-full w-full">Book</button>
              </Link>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}
