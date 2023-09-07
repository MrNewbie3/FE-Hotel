import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TypeRoom() {
  const data = [1, 2, 4, 6, 7, 88, 2, 1, 4];
  return (
    <>
      <div className="flex flex-row flex-wrap gap-x-10 justify-center w-full h-full">
        {data.map((res) => (
          <div className="card w-80 my-10 bg-base-100 shadow-base">
            <div className="card-body">
              <Image width={500} height={500} src={"https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg"} alt={"roomType.className"} className="w-full h-48 object-cover mb-4" />
              <h2 className="card-title">{"roomType.className"}</h2>
              <p className="text-gray-600 text-sm mb-4">Price: ${"roomType.price"} per night</p>
              <p className="text-gray-600 text-sm mb-4">Count of Rooms: {"roomType.roomCount"}</p>
              <div className="card-actions justify-end">
                <Link href={`type/edit-room-type/`}>
                  <button className="btn bg-blueButton border-none">Edit Room Type</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
