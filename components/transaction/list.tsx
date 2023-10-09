import React from "react";
import { getAllDataTrx, getDataTrx } from "../utils/api";
import Link from "next/link";
import Forbidden from "../utils/forbidden";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const ListTrx = async () => {
  let transactionData = await getAllDataTrx();
  if (transactionData === "forbidden") {
    return <Forbidden />;
  }
  async function search(formData: FormData) {
    "use server";
    const params = formData.get("search");
    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_API}transaksi/find?nama_tamu=` + params, {
      headers: {
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    });
    if (!fetchData) {
      console.log(fetchData);
      throw new Error(fetchData);
    }
    const data = await fetchData.json();
    return data;
  }
  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded">
      <h1 className="text-2xl font-bold mb-4">Transaction List</h1>
      <form action={search}>
        <div className="wrapper flex gap-x-10">
          <input type="text" name="search" className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none mb-10" placeholder="Search by guest name" />
          <button type="submit" className="btn ">
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transactionData.data.map((transaction: any) => (
          <div key={transaction.id} className="bg-gray-100 p-6 rounded shadow">
            <p className="text-xl font-bold mb-2">Transaction ID: {transaction.id}</p>
            <p>Booking Number: {transaction.nomor}</p>
            <p>Guest Name: {transaction.nama_pemesan}</p>
            <p>Email: {transaction.email_pemesan}</p>
            <p>Check-in Date: {transaction.tgl_check_in}</p>
            <p>Check-out Date: {transaction.tgl_check_out}</p>
            <p>Number of Rooms: {transaction.jumlah_kamar}</p>
            <p>Room Type ID: {transaction.id_tipe_kamar}</p>
            <Link href={"transaksi/" + transaction.id} className="btn bg-blue-500 flex flex-col items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ">
              Edit Status
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
