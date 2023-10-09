import Footer from "@/components/layout/footer";
import UsrNavbar from "@/components/layout/user/user_navbar";
import React from "react";
import { Inter, Prompt } from "next/font/google";

const prompt = Prompt({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export default function layout({ children }: { children: React.ReactNode }) {
  return <section className={prompt.className}>{children}</section>;
}
