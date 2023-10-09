"use client";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
// EditRoom.js
import React, { useState, useEffect } from "react";
import { PageProps } from "../utils/type";


const EditRoom = ({ params }: PageProps) => {
  const [room, setRoom] = useState<any>({
    id: 0,
    nomor: 0,
    id_tipe_kamar: 0,
  });
  const [type, setType] = useState<any>();
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}kamar/${params.id}`, {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }); // Replace with your API endpoint
        const data = await response.json();

        const responseType = await fetch(`${process.env.NEXT_PUBLIC_API}types/${data.data[0].id_tipe_kamar}`, {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }); // Replace with your API endpoint

        const responseAllType = await fetch(`${process.env.NEXT_PUBLIC_API}types/`, {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        });
        const dataAllType = await responseAllType.json();
        const dataType = await responseType.json();
        if (!data.success) {
          setLoading(false);
          return alert("failed to fetch: " + data.msg);
        }
        if (!dataType.success) {
          setLoading(false);
          return alert("failed to fetch: " + dataType.msg);
        }
        if (!dataAllType.success) {
          setLoading(false);
          return alert("failed to fetch: " + dataType.msg);
        }
        setLoading(false);
        setRoomTypes(dataAllType.data);
        setRoom(data.data[0]);
        setType(dataType.data[0]);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching room details:", error);
        throw new Error(error as any);
      }
    })();
  }, []);

  const handleCancel = () => {
    setRoom({
      id: 0,
      nomor: 0,
      id_tipe_kamar: 0,
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}kamar/${params.id}`, {
        method: "PATCH", // or 'POST' if it's a create operation
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
        body: JSON.stringify(room),
      });
      const res = await response.json();
      if (!res.success) {
        return alert("Error updating room details");
      }
      return alert("Room details updated successfully");
    } catch (error) {
      throw new Error("Error:", error as any);
    }
  };
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <form
            className="w-full max-w-lg"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomor">
                Room Number
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="nomor"
                type="text"
                value={room.nomor}
                onChange={(e) => setRoom({ ...room, nomor: Number(e.target.value) })}
                placeholder="Enter room number"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_tipe_kamar">
                Room Type ID
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="id_tipe_kamar"
                value={room.id_tipe_kamar}
                onChange={(e) => {
                  const idx = roomTypes.findIndex((res: any) => {
                    return res.id == e.target.value;
                  });
                  setType(roomTypes[idx]);
                  setRoom({ ...room, id_tipe_kamar: Number(e.target.value) });
                }}
              >
                <option value="" disabled>
                  Select Room Type ID
                </option>
                {roomTypes.map((roomType: any) => (
                  <option key={roomType.id} value={roomType.id}>
                    {roomType.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Room Type Name</label>
              <div className="border-b border-dashed border-gray-400 py-2">
                {/* @ts-ignore */}
                {type.nama}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Current Price</label>
              <div className="border-b border-dashed border-gray-400 py-2">
                {/* @ts-ignore */}
                Rp. {type.harga.toLocaleString()}
              </div>
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

export default EditRoom;
