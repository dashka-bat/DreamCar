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

export function Body() {
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
      <div className="w-full flex justify-center items-center flex-col mt-15">
        <h1 className="self-start text-2xl ml-[75px] font-bold text-[#b19155]">
          Одоогийн Сугалаа
        </h1>

        {lottery.map((item) => (
          <div
            key={item.id}
            className="bg-black rounded-lg w-[354px] h-fit mt-5 border-[0.5px] border-[#2E3A4B] p-4"
          >
            <div className="flex justify-between">
              <h3 className="text-[#4ADE80]">
                {item.active ? "Идэвхтэй" : "Идэвхгүй"}
              </h3>
              <h4 className="text-[#b19155]">{item.endedAt}</h4>
            </div>

            <h2 className="text-xl font-bold mt-4 text-[#b19155]">
              {item.name}
            </h2>
            <h3 className="text-[#b19155]">{item.description}</h3>

            {/* Carousel эхэлж байна */}
            {item.img.length > 0 && (
              <div className="relative mt-4 w-full h-[200px] rounded-lg overflow-hidden">
                <Carousel className="w-full h-full">
                  <CarouselContent>
                    {item.img.map((url, index) => (
                      <CarouselItem key={index}>
                        <Image
                          alt={`${item.name}-${index}`}
                          width={360}
                          height={200}
                          src={url}
                          className="rounded-lg object-cover w-full h-full"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Сумнуудыг дотор нь absolute байрлуулсан */}
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#b19155] text-black px-2 py-1 rounded" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#b19155] text-black px-2 py-1 rounded" />
                </Carousel>
              </div>
            )}
            {/* Carousel дуусаж байна */}

            <div className="flex justify-between mt-5 px-4">
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold text-[#b19155]">
                  {item.price}₮
                </h2>
                <h3 className="text-[#b19155]">Тасалбарын үнэ</h3>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold text-[#b19155]">
                  {item.soldNumber}
                </h2>
                <h3 className="text-[#b19155]">Зарагдсан</h3>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-5">
              <h3 className="text-[#b19155] self-center flex">
                {(item.soldNumber * 100) / item.totalNumber}% зарагдсан (
                {item.totalNumber}-аас)
              </h3>
            </div>

            <button className="w-full self-center mt-2 px-4 py-6 h-10 bg-black text-[#b19155] flex justify-center items-center font-bold text-lg rounded-lg border-2 border-[#b19155]">
              Сугалаа худалдаж авах
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
