// components/RegisterForm.js
"use client";
import { useState } from "react";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    role: "user",
    foto: null, // Add a new field for the photo
  });

  const handleChange = (e: any) => {
    if (e.target.name === "foto") {
      setFormData({ ...formData, foto: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formDataWithPhoto = new FormData();
    for (const key in formData) {
      // @ts-ignore
      formDataWithPhoto.append(key, formData[key]);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}user`, {
      method: "POST",
      body: formDataWithPhoto,
    });

    if (response.ok) {
      alert("User registered successfully");
      setFormData({
        nama: "",
        email: "",
        password: "",
        role: "user",
        foto: null,
      });
    } else {
      alert("Error registering user");
    }
  };

  return (
    <form className="mx-20 my-14" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="nama">Name:</label>
        <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label htmlFor="role">Role:</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="ADMIN">Admin</option>
          <option value="RESEPSIONIS">Resepsionis</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="foto">Foto:</label>
        <input type="file" id="foto" name="foto" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}
