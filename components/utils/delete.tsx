"use client";
import { getCookie } from "cookies-next";
import React, { useState } from "react";

interface PageProps {
  id: number;
  url: string;
}

export default function Delete(params: PageProps) {
  const [loading, setLoading] = useState(false);
  const deleteData = async () => {
    if (params.url === "types") {
      const validation = confirm("This action will also remove room related class");
      if (!validation) {
        return alert("cancelled");
      }
    }
    setLoading(true);
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API}${params.url}/${params.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      const res = await data.json();
      if (!res.success) {
        setLoading(!true);
        return alert("Error deleting: " + res.msg);
      }
      setLoading(!true);
      return alert("Successfully deleted");
    } catch (error) {
      setLoading(!true);
      throw new Error(error as any);
    }
  };
  return (
    <>
      {!loading ? (
        <button className="btn btn-error" onClick={() => deleteData()}>
          delete
        </button>
      ) : (
        <button className="btn btn-disabled" disabled>
          deleting...
        </button>
      )}
    </>
  );
}
