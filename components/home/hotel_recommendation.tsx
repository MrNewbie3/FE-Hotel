import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getData, getDataRoomTypes } from "../utils/api";

export default async function HotelRecommendation() {
  const data = await getData();
  const dataTypes = await getDataRoomTypes();

  return (
    <div className="product-preview-content -mt-44 h-fit box-border px-44 max-w-screen ">
      <div className="content-wrapper-container rounded-xl bg-white w-full h-full box-border px-10 py-8 flex flex-col gap-y-36">
        {data.data.map((res: any) => {
          const type = dataTypes.data.find((type: any) => type.id === res.id_tipe_kamar);
          return (
            <div className="hotel card-img text-center font-semibold flex flex-col gap-y-5 w-fit shadow-2xl rounded-md">
              <Image width={400} height={400} src={type.foto || "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg"} alt="" className="object-contain rounded-t-md w-80 mt-0" />
              <p className="text-[#6E6E6E]">
                {type.nama} {res.nomor}
              </p>
              <div className="wrapper flex flex-row items-center mx-2 justify-evenly ">
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                </div>
                <p className="font-nav text-[#3B2929] text-lg">Rp. {type.harga.toLocaleString()},-</p>
              </div>
              <button className="btn mx-5 mb-5">
                <Link href={"/user/catalog/" + res.id} className="w-full h-full flex justify-center items-center">
                  Book Now
                </Link>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
