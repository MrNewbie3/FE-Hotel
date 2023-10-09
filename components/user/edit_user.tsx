"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { PageProps } from "../utils/type";

interface UserInput {
  nama: string;
  foto: string | ArrayBuffer | null;
  email: string;
  password: string;
}

const EditUser = ({ params }: PageProps) => {
  const [user, setUser] = useState<UserInput>({
    nama: "",
    foto: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}user/${params.id}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        const userData = await response.json();
        if (!userData.success) {
          return alert("failed to get user detail: " + userData.msg);
        }
        return setUser(userData.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  useEffect(() => {}, [image]);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setUser({ ...user, foto: e.target.files[0] });

    reader.onload = (event) => {
      // @ts-ignore
      setImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setUser({
      nama: "",
      foto: "",
      email: "",
      password: "",
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    for (const key in user) {
      // @ts-ignore
      formData.append(key, user[key]);
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}user/${params.id}`, {
        body: formData,
        method: "PUT",
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
      });
      const res = await response.json();
      alert("success update user");
      return setUser(res.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <form
            className="w-full max-w-lg"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="nama"
                name="nama"
                type="text"
                value={user.nama || ""}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e);
                }}
                className="mb-2"
              />
              {user.foto == undefined ? (
                <div className="border-b border-dashed border-gray-400 py-2">
                  <Image
                    height={200}
                    width={200}
                    //  @ts-ignore
                    src={user.foto}
                    alt="User"
                    className="w-48 h-48 object-cover"
                  />
                </div>
              ) : (
                <div className="border-b border-dashed border-gray-400 py-2">
                  <Image
                    height={200}
                    width={200}
                    //  @ts-ignore
                    src={image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS84AHMHKdef51QsjaVySZXj85iIXi2CmJaeiy2PlfYRg&s"}
                    alt="User"
                    className="w-48 h-48 object-cover"
                  />
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="email"
                name="email"
                type="email"
                value={user.email || ""}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Enter password"
              />
            </div>
            <div className="flex justify-between mt-8 ">
              <button type="button" className="btn btn-error" onClick={handleBack}>
                Back
              </button>
              <div className="flex justify-end gap-x-5">
                <button type="button" className="btn btn-error" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn bg-none border-none" type="submit">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditUser;
