"use client";
import { getCookie } from "cookies-next";
import { useState } from "react";

export const UpdateTransactionPage = (data: any) => {
  const [newStatus, setNewStatus] = useState("");
  const [allowedStatus, setAllowedStatus] = useState(["BARU", "CHECK_IN", "CHECK_OUT"]); // List of allowed statuses
  const [datas, setData] = useState(data.data);
  const [loading, setLoading] = useState(false);
  const handleStatusChange = (e: any) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (allowedStatus.includes(newStatus)) {
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API}transaksi/${datas.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        });
        const res = await data.json();
        if (!data) {
          throw new Error(res.statusCode);
        }
        if (!res.success) {
          throw new Error(res.message || res.msg || res.code);
        }
        alert("success update data: " + res.code);
      } catch (error) {}
    } else {
      alert("Invalid status");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded">
      <h1 className="text-2xl font-bold mb-4">Update Transaction Status</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p>Email Pemesan: {datas.email_pemesan}</p>
          <p>ID: {datas.id}</p>
          <p>ID Kamar: {datas.id_kamar}</p>
          <p>ID Tipe Kamar: {datas.id_tipe_kamar}</p>
          <p>Jumlah Kamar: {datas.jumlah_kamar}</p>
        </div>
        <div>
          <p>Nama Pemesan: {datas.nama_pemesan}</p>
          <p>Nama Tamu: {datas.nama_tamu}</p>
          <p>Nomor: {datas.nomor}</p>
          <p>Status: {datas.status}</p>
          <p>Tanggal Pemesanan: {datas.tgl_pemesanan}</p>
          <p>Tanggal Check-in: {datas.tgl_check_in}</p>
          <p>Tanggal Check-out: {datas.tgl_check_out}</p>
          <p>User ID: {datas.user_id}</p>
        </div>
      </div>
      <form onSubmit={handleUpdateStatus}>
        <div className="mb-4">
          <label htmlFor="newStatus" className="block text-gray-700 text-sm font-bold mb-2">
            Select New Status
          </label>
          <select
            id="newStatus"
            name="newStatus"
            value={newStatus}
            onChange={handleStatusChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="BARU">BARU</option>
            <option value="CHECK_IN">CHECK_IN</option>
            <option value="CHECK_OUT">CHECK_OUT</option>
          </select>
        </div>
        {!loading ? (
          <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update Status
          </button>
        ) : (
          <button type="button" disabled className="btn btn-disabled hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Loading...
          </button>
        )}
      </form>
    </div>
  );
};
