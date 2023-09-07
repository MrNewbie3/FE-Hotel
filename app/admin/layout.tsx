import AdmNavbar from "@/components/layout/admin/admin_navbar";
import Footer from "@/components/layout/footer";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdmNavbar />
      <section>{children}</section>
      <Footer />
    </>
  );
}
