import Image from "next/image";
import { Section1 } from "./components/section1";
import { Section2 } from "./components/section2";

export default function Home() {
  return (
    <div className="w-full flex  flex-col px-4">
      <Section1 />
      <Section2 />
    </div>
  );
}
