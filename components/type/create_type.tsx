"use client";
import { getCookie } from "cookies-next";
import { useState } from "react";

export default function CreateType() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
    foto: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeFile = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      // @ts-ignore
      form.append(key, formData[key]);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}types`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: form,
    });

    if (response.ok) {
      alert("Room type created successfully");
      setFormData({
        nama: "",
        harga: "",
        deskripsi: "",
        foto: "",
      });
    } else {
      alert("Error creating room type");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Room Type</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nama">Name:</label>
          <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="harga">Price:</label>
          <input type="number" id="harga" name="harga" value={formData.harga} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="deskripsi">Description:</label>
          <textarea id="deskripsi" name="deskripsi" value={formData.deskripsi} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="foto">Photo:</label>
          <input
            type="file"
            id="foto"
            name="foto"
            accept="image/*"
            onChange={(e) => {
              handleChangeFile(e);
            }}
            className="p-2 border rounded"
          />
        </div>
        {!loading ? (
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        ) : (
          <button type="button" disabled className="bg-gray-500 text-white p-2 rounded">
            Loading
          </button>
        )}
      </form>
    </div>
  );
}
