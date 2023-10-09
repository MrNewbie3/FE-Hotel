import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";

const getAuth = async () => {
  const cookieStore = cookies();
  const user = await fetch(`${process.env.NEXT_PUBLIC_API}auth/user`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + cookieStore.get("token")?.value,
    },
  });
  if (!user.ok) {
    if (user.status === 401) {
      return "";
    }
    throw new Error(user.statusText);
  }
  const res = await user.json();

  if (res.statusCode === 401) {
    return res;
  }
  return res;
};

export default async function layout({ children }: { children: React.ReactNode }) {
  const data = await getAuth();

  if (data.id !== undefined) {
    if (data.role == "ADMIN" || data.role == "RESEPSIONIS") {
      return redirect("/admin");
    }
    return redirect("/user");
  }
  return <>{children}</>;
}
