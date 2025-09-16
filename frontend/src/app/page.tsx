import Image from "next/image";
import { Section1 } from "./components/section1";
import { Section3 } from "./components/section3";
import { Section4 } from "./components/section4";

export default function Home() {
  return (
    <div>
      <Section1 />
      <Section3 />
      <Section4 />
    </div>
  );
}
