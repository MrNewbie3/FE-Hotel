import React from "react";
import HotelRecommendation from "./hotel_recommendation";
import AnimJumbotron from "./anim_jumbotron";

export default function Jumbotron() {
  return (
    <div className="image wrapper w-screen min-h-screen mb-20">
      <AnimJumbotron />
      <HotelRecommendation />
    </div>
  );
}
