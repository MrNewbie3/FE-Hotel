import EditRoom from "@/components/room/edit_room";
import { PageProps } from "@/components/utils/type";
import React from "react";

export default function page({ params }: PageProps) {
  return (
    <>
      <EditRoom params={params} />
    </>
  );
}
