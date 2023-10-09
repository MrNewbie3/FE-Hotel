import Footer from "@/components/layout/footer";
import UsrNavbar from "@/components/layout/user/user_navbar";
import React from "react";
import { Prompt } from "next/font/google";
import { redirect } from "next/navigation";
import { getAuth } from "@/components/utils/api";

const prompt = Prompt({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export default async function layout({ children }: { children: React.ReactNode }) {
  const user = await getAuth();
  if (user.role != "USER") {
    return redirect("/admin");
  }
  return (
    <>
      <UsrNavbar />
      <section className={prompt.className}>{children}</section>
      <Footer />
    </>
  );
}
