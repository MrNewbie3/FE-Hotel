"use client";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface RoomDataTypes {
  nomor: Number;
  id_tipe_kamar: Number;
}

const CreateRoomPage = () => {
  const [roomData, setRoomData] = useState<RoomDataTypes>({
    nomor: 0,
    id_tipe_kamar: 0,
  });
  const [loading, setLoading] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]); // State for storing room types
  const router = useRouter();

  useEffect(() => {
    // Function to fetch room types from the backend
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}types`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }); // Replace with your API endpoint
        const data = await response.json();
        if (!data.success) {
          return alert(data.msg);
        }
        // Assuming the response is an array of room types
        return setRoomTypes(data.data);
      } catch (error) {
        throw new Error("Error fetching room types: " + error);
      }
    };

    fetchRoomTypes(); // Call the function to fetch room types
  }, []);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}kamar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify(roomData),
      });

      const data = await response.json();
      if (!data.success) {
        setLoading(false);
        return alert("Error creating room: " + data.msg);
      }
      alert("Room created successfully");
      // router.back();
      setLoading(false);
      return setRoomData({
        nomor: 0,
        id_tipe_kamar: 0,
      });
    } catch (error) {
      setLoading(false);
      console.error("Error creating room:", error);
      alert("Error creating room: " + error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create a Room</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nomor" className="block text-sm font-bold mb-2">
            Room Number
          </label>
          <input
            type="number"
            id="nomor"
            name="nomor"
            value={Number(roomData.nomor)}
            onChange={(e) => setRoomData({ ...roomData, nomor: Number(e.target.value) })}
            className="block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div style={{ marginLeft: "10px", color: "" }} className="mb-4">
          <label htmlFor="id_tipe_kamar" className="block text-sm font-bold mb-2">
            Room Type
          </label>
          {roomTypes.length > 0 ? (
            <select
              id="id_tipe_kamar"
              name="id_tipe_kamar"
              value={Number(roomData.id_tipe_kamar)}
              onChange={(e) => setRoomData({ ...roomData, id_tipe_kamar: Number(e.target.value) })}
              className="block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Room Type</option>
              {roomTypes.map((roomType) => (
                // @ts-ignore
                <option key={roomType.id} value={roomType.id}>
                  {/* @ts-ignore */}
                  {roomType.nama}
                </option>
              ))}
            </select>
          ) : (
            <h1>provide the room type first</h1>
          )}
        </div>
        {!loading ? (
          <button type="submit" className="btn btn-primary">
            Create Room
          </button>
        ) : (
          <button type="submit" disabled className="btn btn-disabled">
            Loading
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateRoomPage;
