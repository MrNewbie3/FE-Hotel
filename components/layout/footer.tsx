import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

export default function Footer() {
  return (
    <footer className="bg-[#222] p-2 py-4 text-white ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Panel */}
        <div className="text-xl flex items-center gap-x-20">
          <a className="btn btn-ghost normal-case text-xl">ARTH ROOM</a>
          <div className="flex gap-x-9">
            <button className="text-gray-300 hover:text-white text-sm">About</button>
            <button className="text-gray-300 hover:text-white text-sm">Privacy Policy</button>
            <button className="text-gray-300 hover:text-white text-sm">Terms & Conditions</button>
            <button className="text-gray-300 hover:text-white text-sm">Return Policy</button>
          </div>
        </div>

        {/* Right Panel */}
        <div>
          <div className="flex space-x-4">
            <a href="#" className="bg-white bg-opacity-30 hover:bg-opacity-40 w-10 h-10 flex items-center justify-center rounded-full ">
              <i className="fab text-lg text-black fa-facebook "></i>
            </a>
            <a href="#" className="bg-white bg-opacity-30 hover:bg-opacity-40 w-10 h-10 flex items-center justify-center rounded-full ">
              <i className="fab text-lg text-black fa-twitter "></i>
            </a>
            <a href="#" className="bg-white bg-opacity-30 hover:bg-opacity-40 w-10 h-10 flex items-center justify-center rounded-full ">
              <i className="fab text-lg text-black fa-google "></i>
            </a>
            <a href="#" className="bg-white bg-opacity-30 hover:bg-opacity-40 w-10 h-10 flex items-center justify-center rounded-full ">
              <i className="fab text-lg text-black fa-instagram "></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
