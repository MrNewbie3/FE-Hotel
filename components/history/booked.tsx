import React from "react";
import SummaryComps from "./summary";

export default function Booked() {
  const data = [1];
  return (
    <>
      <div className="flex flex-row justify-center w-full h-full">
        <div className="wrapper flex flex-row flex-wrap gap-x-4 justify-center">
          {data.map((data, index) => {
            return (
              <div className="card w-96 my-10 bg-base-100 shadow-base">
                <div className="card-body">
                  <h2 className="card-title">data</h2>
                  <div className={"wrapper mt-14 flex justify-center  w-full "}>
                    <div className="text flex flex-col gap-y-3 w-220">
                      <div className="wrapper flex flex-col gap-y-3">
                        <SummaryComps title="Waktu Tersisa" value="Finished" />
                        <SummaryComps title="Akun Virtual" value={"data.response_midtrans"} />
                        <SummaryComps title="Nama Bank" value={"data.bank"} />
                        <SummaryComps title="Harga" value={"Rp " + "data.gross_amount "} />
                        <SummaryComps title="jumlah orang" value={"data.people"} />
                        <SummaryComps title="tanggal order" value={"dateConverter"} />
                        <div className="divider"></div>
                        <SummaryComps title="Total bayar" value={"Rp " + "data"} />
                      </div>
                      <div className="button self-end mt-14">
                        <button className="btn rounded-full px-8 bg-blueButton border-none mx-2">Lihat Detail</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
