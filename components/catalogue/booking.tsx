"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { PageProps } from "../utils/type";
import { useRouter } from "next/navigation";
import moment from "moment";

const BookRoomPage = ({ params }: PageProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [roomCount, setRoomCount] = useState(1);
  const [room, setRoom] = useState<any>({
    id: 0,
    nomor: 0,
    id_tipe_kamar: 0,
  });

  const [excludeDateStart, setExcludeDateStart] = useState<any>([]);
  const [excludeDateEnd, setExcludeDateEnd] = useState<any>([]);
  const [type, setType] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    nomor: room.nomor,
    id_kamar: "",
    nama_pemesan: "",
    email_pemesan: "",
    tgl_pemesanan: moment(new Date(), "YYYY-MM-DD HH:mm:ss").toDate(),
    tgl_check_in: startDate,
    tgl_check_out: endDate,
    nama_tamu: "",
    jumlah_kamar: roomCount,
    id_tipe_kamar: room.id_tipe_kamar,
    status: "BARU", // Assuming you have a status field in your schema
    user_id: "", // Replace with actual user ID
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}kamar/${params.id}`, {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        });
        const data = await response.json();

        const responseType = await fetch(`${process.env.NEXT_PUBLIC_API}types/${data.data[0].id_tipe_kamar}`, {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        });
        const dataType = await responseType.json();

        const userAuth = await fetch(`${process.env.NEXT_PUBLIC_API}auth/user`, {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        });
        const resUserAuth = await userAuth.json();
        const trx = await fetch(`${process.env.NEXT_PUBLIC_API}transaksi`, {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        });
        const resTrx = await trx.json();

        if (!trx.ok) {
          setLoading(false);
          return alert("failed to fetch: " + resTrx.msg);
        }
        if (!userAuth.ok) {
          setLoading(false);
          return alert("failed to fetch: " + dataType.msg);
        }
        if (!data.success) {
          setLoading(false);
          return alert("failed to fetch: " + data.msg);
        }
        if (!dataType.success) {
          setLoading(false);
          return alert("failed to fetch: " + dataType.msg);
        }

        resTrx.data.map((res: any) => {
          for (const key in res) {
            if (key == "tgl_check_in") {
              setExcludeDateStart([...excludeDateStart, res[key]]);
            }
            if (key == "tgl_check_out") {
              setExcludeDateEnd([...excludeDateEnd, res[key]]);
            }
          }
        });

        setLoading(false);
        setRoom(data.data[0]);
        setType(dataType.data[0]);

        setBookingData((prevState) => ({
          ...prevState,
          nama_pemesan: resUserAuth.nama,
          email_pemesan: resUserAuth.email,
          user_id: resUserAuth.id,
          id_tipe_kamar: data.data[0].id_tipe_kamar,
          nomor: data.data[0].nomor,
          id_kamar: data.data[0].id,
        }));
      } catch (error) {
        setLoading(false);
        console.error("Error fetching room details:", error);
        throw new Error(error as any);
      }
    })();
  }, []);

  const handleIncrement = () => {
    setRoomCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (roomCount > 1) {
      setRoomCount((prevCount) => prevCount - 1);
    }
  };
  const interval = excludeDateStart.map((e: Array<any>, index: number) => {
    return { start: new Date(excludeDateStart[index]).getTime(), end: new Date(excludeDateEnd[index]).getTime() };
  });

  const handleBookNow = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}transaksi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();

      const responseDetail = await fetch(`${process.env.NEXT_PUBLIC_API}detail-pemesanan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
        body: JSON.stringify({
          id_pemesanan: data.data.id,
          id_kamar: room.id,
          harga: type.harga * bookingData.jumlah_kamar,
          tgl_akses: moment(data.data.tgl_check_in, "YYYY-MM-DD HH:mm:ss").toDate(),
        }),
      });

      const dataDetail = await responseDetail.json();
      if (!response.ok) {
        setLoading(!true);
        return alert("Booking failed: " + response.statusText);
      }
      if (!data.success) {
        setLoading(!true);
        return alert("Booking failed: " + data.msg || data.message);
      }
      if (!responseDetail.ok) {
        setLoading(!true);
        return alert("Booking failed: " + responseDetail.statusText || dataDetail.message);
      }
      if (!dataDetail.success) {
        setLoading(!true);
        return alert("Booking failed: " + dataDetail.msg || dataDetail.message);
      }
      setLoading(!true);
      alert("Booking successful:" + dataDetail);
    } catch (error) {
      setLoading(!true);
      console.log(error);
      throw new Error("Error booking room:", error as any);
    }
  };
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Book a Hotel Room</h1>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Image width={1000} height={1000} src="/assets/luxury-hotel.jpg" alt="Room 1" className="w-full h-80 object-cover" />
            <div>
              <h2 className="text-xl font-bold mb-2">
                {type.nama} : {room.nomor}
              </h2>
              <p className="text-gray-700 mb-4">{type.deskripsi}</p>
              <p className="text-gray-700 mb-4">Price per night: Rp {type.harga.toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="nama_tamu" className="block text-sm font-bold mb-2">
              Guest Name
            </label>
            <input
              type="text"
              id="nama_tamu"
              name="nama_tamu"
              value={bookingData.nama_tamu}
              onChange={(e) => setBookingData({ ...bookingData, nama_tamu: e.target.value })}
              className="block w-full p-2 border border-gray-300 rounded shadow-sm mb-4 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="nama_pemesan" className="block text-sm font-bold mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="nama_pemesan"
              name="nama_pemesan"
              value={bookingData.nama_pemesan}
              onChange={(e) => setBookingData({ ...bookingData, nama_pemesan: e.target.value })}
              className="block w-full p-2 border border-gray-300 rounded shadow-sm mb-4 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="email_pemesan" className="block text-sm font-bold mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email_pemesan"
              name="email_pemesan"
              value={bookingData.email_pemesan}
              onChange={(e) => setBookingData({ ...bookingData, email_pemesan: e.target.value })}
              className="block w-full p-2 border border-gray-300 rounded shadow-sm mb-4 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label className="block text-sm font-bold mb-2">Select Dates</label>
            {/* @ts-ignore */}
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                // @ts-ignore
                setBookingData({ ...bookingData, tgl_check_in: moment(date, "YYYY-MM-DD HH:mm:ss").toDate() });
              }}
              selectsStart
              excludeDateIntervals={interval}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              className="block w-full p-2 border border-gray-300 rounded shadow-sm mb-4 focus:outline-none focus:border-blue-500"
            />
            {/* @ts-ignore */}
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                // @ts-ignore
                setBookingData({ ...bookingData, tgl_check_out: moment(date, "YYYY-MM-DD HH:mm:ss").toDate() });
              }}
              selectsEnd
              excludeDateIntervals={interval}
              startDate={startDate || Date.now()}
              endDate={endDate}
              minDate={startDate}
              // @ts-ignore
              maxDate={new Date(startDate).getTime() < new Date(excludeDateStart[0]).getTime() ? new Date(excludeDateStart[0]).getTime() : 0}
              className="block w-full p-2 border border-gray-300 rounded shadow-sm mb-4 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="roomCount" className="block text-sm font-bold mb-2">
              Count of Rooms
            </label>
            <div className="wrapper flex flex-col gap-y-5">
              <div className="flex items-center">
                <button onClick={handleDecrement} className="bg-gray-300 p-2 rounded-l focus:outline-none">
                  -
                </button>
                <input type="text" id="roomCount" name="roomCount" value={roomCount} readOnly className="block w-full p-2 text-center border-t border-b border-gray-300 bg-gray-100" />
                <button onClick={handleIncrement} className="bg-gray-300 p-2 rounded-r focus:outline-none">
                  +
                </button>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      )}
    </>
  );
};

export default BookRoomPage;
