"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Body } from "./_feature/body";

export default function Home() {
  const [lottery, setLottery] = useState([]);
  useEffect(() => {
    const fetchLottery = async () => {
      const res = await fetch("/api/lottery");
      const data = await res.json();
      setLottery(data);
    };
    fetchLottery();
  }, []);
  return (
    <div className="w-full min-h-screen flex justify-center bg-black">
      <div className="w-[375px] bg-black min-h-screen flex flex-col">
        {" "}
        <Header />
        <div className="w-full min-h-screen flex justify-center bg-black">
          <Body />
        </div>
        <Footer />
      </div>
    </div>
  );
}
