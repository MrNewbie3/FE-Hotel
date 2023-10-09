import React from "react";
import { Invoice } from "@/components/pdf/invoice";
import { PageProps } from "@/components/utils/type";
import { getDataTrx } from "@/components/utils/api";
import { redirect } from "next/navigation";

export default async function page({ params }: PageProps) {
  const data = await getDataTrx(params.id);
  if (data === "forbidden") {
    // return redirect("/user");
  }

  return <Invoice data={data.data[0]} />;
}
