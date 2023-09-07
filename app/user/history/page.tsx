import Booked from "@/components/history/booked";
import NoTicket from "@/components/history/no_ticket";
import React from "react";

export default function UserPage() {
  return (
    <>
      <NoTicket />
      <Booked />
    </>
  );
}
