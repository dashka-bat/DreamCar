import Image from "next/image";
import { Section1 } from "./components/section1";
import { Section2 } from "./components/section2";
import { Section3 } from "./components/section3";
import { Section4 } from "./components/section4";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center bg-black">
      <div className="w-[375px] bg-black min-h-screen flex flex-col">
        <Header />
        <Section1 />
        <Section2 />
        {/* <Section3 /> */}
        <Section4 />
        <Footer />
      </div>
    </div>
  );
}
