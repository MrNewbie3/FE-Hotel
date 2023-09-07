import { Inter, Prompt } from "next/font/google";

const prompt = Prompt({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export default function Home() {
  return (
    <section className="h-screen">
      <h1 className={prompt.className}>hello world</h1>;
    </section>
  );
}
