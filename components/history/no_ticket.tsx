import Link from "next/link";
import React from "react";

export default function NoTicket() {
  return (
    <>
      <div className="flex flex-row justify-center w-full h-full ">
        <div className="card w-96 my-10 mb-32 bg-base-100 shadow-base">
          <div className="card-body">
            <h2 className="card-title">Tiket anda kosong</h2>
            <p className="mb-10">Silahkan beli tiket terlebih dahulu </p>
            <div className="card-actions justify-end">
              <Link href="/catalog">
                <button className="btn bg-blueButton border-none">Beli tiket</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
