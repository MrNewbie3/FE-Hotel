import { UpdateTransactionPage } from "@/components/transaction/update_trx";
import { getDataTrx } from "@/components/utils/api";
import { PageProps } from "@/components/utils/type";
import React from "react";

export default async function page({ params }: PageProps) {
  const dataTrx = await getDataTrx(params.id);

  return (
    <>
      <UpdateTransactionPage data={dataTrx.data[0]} />
    </>
  );
}
