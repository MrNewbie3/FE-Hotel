"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Form {
  nama: string;
  email: string;
  password: string;
  foto: Buffer | undefined | File;
  role: "USER";
}

const Register = () => {
  const [form, setFormData] = useState<Form>({
    nama: "",
    email: "",
    password: "",
    foto: undefined,
    role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...form,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...form,
          foto: file,
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      // @ts-ignore
      formData.append(key, form[key]);
    }

    try {
      const register = await fetch(`${process.env.NEXT_PUBLIC_API}` + "user", {
        method: "POST",
        body: formData,
      });

      const res = await register.json();
      if (res.code !== 201) {
        setLoading(false);
        return alert(res.message || res.msg || res.error);
      }
      const mailData = { to: res.data.email };
      const emailService = await fetch(`${process.env.NEXT_PUBLIC_API}` + "mail", {
        method: "POST",
        body: JSON.stringify(mailData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resEmail = await emailService.json();
      if (resEmail.code !== 200) {
        setLoading(false);
        return alert(res.msg || res.error);
      }
      localStorage.setItem("email", res.data.email);
      setLoading(false);
      return navigation.push("/verified");
    } catch (error: any) {
      alert(error);
      throw new Error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
          <input
            type="text"
            className={`w-full px-3 py-2 placeholder-gray-400 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline ${!form.nama ? "border-red-500" : ""}`}
            placeholder="Full Name"
            name="nama"
            value={form.nama}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          {!form.nama && <p className="text-red-600 font-semibold text-sm">Full Name is required</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            className={`w-full px-3 py-2 placeholder-gray-400 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline ${!form.email ? "border-red-500" : ""}`}
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          {!form.email && <p className="text-red-600 font-semibold text-sm">Email is required</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="Password"
              value={form.password}
              name="password"
              onChange={(e) => handleInputChange(e)}
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-3-6a1 1 0 112 0v2a1 1 0 11-2 0v-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline ${!form.foto ? "border-red-500" : ""}`}
            name="foto"
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
        </div>
        <p className="mb-4 text-sm font-semibold">
          Already have an account?{" "}
          <Link className="underline" href={"/login"}>
            Login here
          </Link>
        </p>
        {loading ? (
          <button disabled type="button" className="bg-white hover:bg-blue-600 text-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Loading
          </button>
        ) : (
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
