"use client";

import Image from "next/image";
import { Header } from "@/app/components/header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Winner() {
  const [winner, setWinner] = useState<any>(null);
  const { id } = useParams();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchWinner = async () => {
      try {
        const res = await fetch(`/api/getOneLottery/${id}`);
        if (!res.ok) throw new Error("Failed to fetch winner");
        const data = await res.json();
        const winnerImgs = data?.winners?.[0]?.img || [];
        setWinner({ ...data, winnerImgs });
      } catch (err) {
        console.error("Error fetching winner:", err);
      }
    };
    fetchWinner();
  }, [id]);

  if (!winner) {
    return (
      <div className="bg-black w-full h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-black min-h-screen">
      <div className="w-full max-w-[375px] px-2">
        <Header />

        <div className="mt-5 space-y-5">
          {winner.winners.map((w: any, idx: number) => (
            <div
              key={w._id || idx}
              className="bg-[#1a1a1a] border border-[#b19155] rounded-md overflow-hidden shadow-md"
            >
              {/* Зураг carousel */}
              {w.img?.length > 0 && (
                <div className="relative w-full h-[200px] sm:h-[250px] overflow-hidden">
                  <Carousel className="w-full h-full">
                    <CarouselContent>
                      {w.img.map((url: string, index: number) => (
                        <CarouselItem key={index}>
                          <div className="relative w-full h-[200px] sm:h-[250px] rounded-lg overflow-hidden bg-black">
                            <Image
                              alt={`${w.name}-${index}`}
                              src={url}
                              fill
                              className="object-contain rounded-lg"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#b19155] text-black px-2 py-1 rounded" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#b19155] text-black px-2 py-1 rounded" />
                  </Carousel>
                </div>
              )}

              <div className="p-4 space-y-2 text-[#b19155]">
                <h2 className="text-xl font-extrabold">{w.name}</h2>
                <p className="text-sm">
                  Азтан болсон сугалааны дугаар: {w.ticketNumber}
                </p>
                <p className="text-sm">Утас: {w.phoneNumber}</p>
                <p className="text-base font-medium">{w.description}</p>
              </div>

              {/* Video modal */}

              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full mb-2 self-center mt-2 px-4 py-3 bg-black text-[#b19155] flex justify-center items-center font-bold text-lg rounded-lg border-2 border-[#b19155]">
                   Тохирлын шууд бичлэг үзэх
                  </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg w-[320px] p-0 bg-black">
                  {/* Accessibility-д зориулсан DialogTitle */}
                  <DialogTitle>
                    <VisuallyHidden>Video үзэх</VisuallyHidden>
                  </DialogTitle>

                  <div className="flex justify-center items-center">
                    <iframe src={winner?.winners[0]?.URL} width="300" height="500" style={{ border: "none", overflow: "hidden" }} allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" ></iframe>
                  </div>

                  <div className="flex justify-end p-2">
                    <DialogClose className="px-4 py-2 border border-[#b19155] rounded text-[#b19155]">
                      Хаах
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

