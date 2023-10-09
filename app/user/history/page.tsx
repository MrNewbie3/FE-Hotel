import Booked from "@/components/history/booked";
import NoTicket from "@/components/history/no_ticket";
import { getAuth } from "@/components/utils/api";
import { cookies } from "next/headers";
import React from "react";

export const getDataTrx = async (user_id: number) => {
  const token = cookies();
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}transaksi/find?user_id=` + user_id, {
      headers: {
        Authorization: `Bearer ${token.get("token")?.value}`,
      },
    });
    const res = await data.json();

    if (res.statusCode === 403) {
      return "forbidden";
    }
    if (!res.success) {
      if (res.code === 404) return res;
      throw new Error(res.statusCode);
    }
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

export default async function UserPage() {
  const user = await getAuth();
  const trx = await getDataTrx(user.id);

  return <>{trx.data.length > 0 ? <Booked data={trx.data} /> : <NoTicket />}</>;
}
