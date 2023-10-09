import AdmNavbar from "@/components/layout/admin/admin_navbar";
import Footer from "@/components/layout/footer";
import { getAuth } from "@/components/utils/api";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({ children }: { children: React.ReactNode }) {
  const user = await getAuth();
  if (user.role == "USER") {
    return redirect("/user");
  }
  return (
    <>
      <AdmNavbar />
      <section>{children}</section>
      <Footer />
    </>
  );
}
