import BookRoomPage from "@/components/catalogue/booking";
import Jumbotron from "@/components/home/jumbotron";
import { PageProps } from "@/components/utils/type";
import React from "react";

export default function UserPage({ params }: PageProps) {
  return (
    <>
      <BookRoomPage params={params} />
    </>
  );
}
