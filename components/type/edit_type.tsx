"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCookie } from "cookies-next";

interface dataTypes {
  id: number;
  nama: string;
  harga: number;
  deskripsi: string;
  foto: string | ArrayBuffer | null;
}

interface PageProps {
  params: {
    id: string;
  };
}
export default function EditRoomType({ params }: PageProps) {
  const [loading, setLoading] = useState(true);
  const [roomType, setRoomType] = useState<dataTypes>({
    id: 0,
    nama: "",
    harga: 0,
    deskripsi: "",
    foto: "",
  });

  const router = useRouter();

  useEffect(() => {
    // Fetch room type details based on ID
    (async () => {
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API}types/` + params.id, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        const res = await data.json();
        if (!res.success) {
          setLoading(false);
          return alert("failed to get data: " + res.msg);
        }
        setLoading(false);
        return setRoomType(res.data[0]);
      } catch (error) {
        setLoading(false);
        throw new Error(error as string);
      }
    })();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRoomType({ ...roomType, [name]: value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        setRoomType({ ...roomType, foto: event.target.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    // Reset the form fields
    setRoomType({
      id: 0,
      nama: "",
      harga: 0,
      deskripsi: "",
      foto: "",
    });
  };

  const handleBack = () => {
    // Navigate back to the previous page
    router.back();
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);

    e.preventDefault();
    const formData = new FormData();
    for (const key in roomType) {
      // @ts-ignore
      formData.append(key, roomType[key]);
    }
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API}types/` + params.id, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
        body: formData,
      });
      const res = await data.json();
      if (!res.success) {
        setLoading(false);
        return alert("failed to update data: " + res.msg);
      }
      setLoading(false);
      return setRoomType(res.data);
    } catch (error) {
      setLoading(false);
      throw new Error(error as string);
    }
    // Add code to update room type details in API or database
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!loading ? (
        <form
          className="w-full max-w-lg"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
              Room Type Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="nama"
              name="nama"
              type="text"
              value={roomType.nama || ""}
              onChange={handleInputChange}
              placeholder="Enter room type name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="harga">
              Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="harga"
              name="harga"
              type="number"
              value={roomType.harga || ""}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi">
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="deskripsi"
              name="deskripsi"
              value={roomType.deskripsi || ""}
              onChange={handleInputChange}
              placeholder="Enter description"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Room Type Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
            {roomType.foto && (
              <div className="border-b border-dashed border-gray-400 py-2">
                {/* @ts-ignore */}
                <Image height={300} width={300} src={roomType.foto} alt="Room Type" className="w-48 h-48 object-cover" />
              </div>
            )}
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
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

EditRoomType;
