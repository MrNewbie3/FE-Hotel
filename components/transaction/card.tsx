import Link from "next/link";
import React from "react";

export default function Card(transactionData: any) {
  return (
    <>
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
    </>
  );
}
