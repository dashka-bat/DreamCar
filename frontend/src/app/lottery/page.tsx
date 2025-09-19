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
import { Body } from "./body";
import { Footer } from "../components/footer";
type Lottery = {
  id: number;
  name: string;
  description: string;
  img: string[];
  price: number;
  totalNumber: number;
  soldNumber: number;
  active: boolean;
  endedAt: string;
  createdAt: string;
};

export default function Home() {
  const [lottery, setLottery] = useState<Lottery[]>([]);
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
