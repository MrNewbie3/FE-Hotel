"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function AnimJumbotron() {
  const el = useRef(null);
  const type = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Wellcome to ARTH HOTEL", "Enjoy your trip,", "Thanks for choosing us!", "ARTH HOTEL"],
      typeSpeed: 30,
      backSpeed: 30,
      backDelay: 500,
      loop: false,
      showCursor: false,
    });
    const sub = new Typed(type.current, {
      strings: ["", "", "", "by Arthur Andy"],
      typeSpeed: 30,
      backSpeed: 30,
      backDelay: 500,
      loop: false,
      showCursor: false,
    });
    return () => {
      typed.destroy();
      sub.destroy();
    };
  }, []);

  return (
    <>
      <Image alt="hero_img" className="w-full h-full contrast-100 brightness-[0.25] fixed -z-20 top-0" width={2000} height={2000} src={"/assets/luxury-hotel.jpg"} />
      <div className="wrapper flex flex-col items-center h-screen w-full justify-center text-white ">
        <div className="text-5xl h-20" ref={el}></div>
        <div className="" ref={type}></div>
      </div>
    </>
  );
}
