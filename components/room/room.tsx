import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Room() {
  const data = [1, 2, 4, 5, 6, 67];
  return (
    <>
      <div className="flex flex-row flex-wrap gap-x-10 justify-center w-full h-full">
        {data.map((res) => (
          <div className="card w-80 my-10 bg-base-100 shadow-base">
            <div className="card-body">
              <Image width={500} height={500} src={"https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg"} alt={"room.className"} className="w-full h-48 object-cover mb-4" />
              <h2 className="card-title">{"room.className"}</h2>
              <p className="text-gray-600 text-sm mb-4">Price: ${"room.price"} per night</p>
              <p className="text-gray-600 text-sm mb-4">Availability: {true ? "Available" : "Not Available"}</p>
              <p className="text-gray-600 text-sm mb-4">Number of Rooms: {"room.roomCount"}</p>
              <div className="card-actions justify-end">
                <Link href={`/admin/edit-room/`}>
                  <button className="btn bg-blueButton border-none">Edit Room</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
