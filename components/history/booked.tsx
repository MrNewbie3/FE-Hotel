import React from "react";
import SummaryComps from "./summary";
import moment from "moment";
import Link from "next/link";

interface Data {
  data: Array<any>;
}

export default async function Booked(data: Data) {
  return (
    <>
      <div className="flex flex-row justify-center w-full h-full">
        <div className="wrapper flex flex-row flex-wrap gap-x-4 justify-center">
          {data.data.map((data, index) => {
            return (
              <div key={data.id} className="card w-96 my-10 bg-base-100 shadow-base">
                <div className="card-body">
                  <h2 className="card-title">{data.id}</h2>
                  <div className={"wrapper mt-14 flex justify-center  w-full "}>
                    <div className="text flex flex-col gap-y-3 w-220">
                      <div className="wrapper flex flex-col gap-y-3">
                        <SummaryComps title="Order by" value={data.nama_pemesan} />
                        <SummaryComps title="Email" value={data.email_pemesan} />
                        <SummaryComps title="Guest" value={data.nama_tamu} />
                        <SummaryComps title="Room Number" value={data.nomor} />
                        <SummaryComps title="Qty" value={data.jumlah_kamar} />
                        <SummaryComps title="Order Date" value={moment(new Date(data.tgl_pemesanan)).format("DD-MM-YYYY")} />
                        <div className="divider"></div>
                        {/* @ts-ignore */}
                        <SummaryComps title="Status" value={data.status === "BARU" && "Booked"} />
                      </div>
                      <div className="button self-end mt-14">
                        {!(data.status === "BARU") ? (
                          <></>
                        ) : (
                          <Link href={"history/" + data.id} className="btn rounded-full px-8 bg-blueButton border-none mx-2">
                            Cetak Invoice
                          </Link>
                        )}
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
