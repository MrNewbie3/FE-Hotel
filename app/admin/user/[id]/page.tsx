import EditUser from "@/components/user/edit_user";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}
export default function page({ params }: PageProps) {
  return (
    <>
      <EditUser
        params={{
          id: params.id,
        }}
      />
    </>
  );
}
