import Link from "next/link";
import React from "react";

export default function NoTicket() {
  return (
    <>
      <div className="flex flex-row justify-center w-full h-full ">
        <div className="card w-96 my-10 mb-32 bg-base-100 shadow-base">
          <div className="card-body">
            <h2 className="card-title">Tidak ada ruangan dipesan</h2>
            <p className="mb-10">Silahkan pesan kamar terlebih dahulu </p>
            <div className="card-actions justify-end">
              <Link href="catalog">
                <button className="btn bg-blueButton border-none">Pesan Kamar</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
