import EditRoomType from "@/components/type/edit_type";
import { PageProps } from "@/components/utils/type";
import React from "react";

export default function page({ params }: PageProps) {
  return (
    <>
      <EditRoomType
        params={{
          id: params.id,
        }}
      />
    </>
  );
}
