"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiSearch } from "react-icons/ci";

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
  const [formState, setFormState] = useState<{
    [id: number]: { phone: string; quantity: number; totalAmount: number };
  }>({});
  const [openDialog, setOpenDialog] = useState<null | number>(null);
  const [openDialog2, setOpenDialog2] = useState<null | number>(null);
  const [showConfirmation, setShowConfirmation] = useState<null | number>(null);
  const [showConfirmation2, setShowConfirmation2] = useState<null | number>(
    null
  );
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    const fetchLottery = async () => {
      const res = await fetch("/api/lottery");
      const data = await res.json();
      setLottery(data);
    };
    fetchLottery();
  }, []);

  // Input change
  const handleInputChange = (
    id: number,
    field: "phone" | "quantity",
    value: string | number,
    price?: number
  ) => {
    setFormState((prev) => {
      let newQuantity = prev[id]?.quantity ?? 0;

      if (field === "quantity") {
        newQuantity =
          value === "" || isNaN(Number(value)) || Number(value) <= 0
            ? 0
            : Number(value);
      }

      const totalAmount = price && newQuantity > 0 ? newQuantity * price : 0;

      return {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: field === "quantity" ? newQuantity : value,
          quantity: newQuantity,
          totalAmount,
        },
      };
    });
  };

  // Худалдаж авах
  const handleSubmit = async (id: number) => {
    try {
      const item = {
        ...formState[id],
        categoryId: String(id),
        phoneNumber: String(formState[id]?.phone || ""),
        quantity: String(formState[id]?.quantity || 0),
      };

      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        setFormState((prev) => ({
          ...prev,
          [id]: { phone: "", quantity: 0, totalAmount: 0 },
        }));
        setShowConfirmation(null);
      }
    } catch (error) {
      console.log("Error submitting request:", error);
    }
  };

  // Сугалаа шалгах
  const handleSearch = async (id: number) => {
    try {
      fetch("/api/participants/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setParticipants(data.participants || []);
        });
    } catch (error) {
      console.log("Error fetching participants:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-black">
      <div className="w-full flex justify-center items-center flex-col mt-15">
        <h1 className="self-start text-2xl ml-[75px] font-bold text-[#b19155]">
          Одоогийн Сугалаа
        </h1>

        {lottery.map((item) => {
          const phone = formState[item.id]?.phone || "";
          const quantity = formState[item.id]?.quantity || 0;
          const totalAmount = formState[item.id]?.totalAmount || 0;
          const isPhoneValid = /^\d{8}$/.test(phone);

          return (
            <div
              key={item.id}
              className="bg-black rounded-lg w-[354px] h-fit mt-5 border-[0.5px] border-[#2E3A4B] p-4"
            >
              <div className="flex justify-between">
                <h3
                  className={`${
                    item.active ? "text-[#4ADE80]" : "text-red-600"
                  }`}
                >
                  {item.active ? "Идэвхтэй" : "Идэвхгүй"}
                </h3>
                <h4 className="text-[#b19155]">
                  {new Date(item.endedAt).toISOString().split("T")[0]}
                </h4>
              </div>

              <h2 className="text-xl font-bold mt-4 text-[#b19155]">
                {item.name}
              </h2>
              <h3 className="text-[#b19155]">{item.description}</h3>

              {/* Carousel */}
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
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#b19155] text-black px-2 py-1 rounded" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#b19155] text-black px-2 py-1 rounded" />
                  </Carousel>
                </div>
              )}

              {/* Үнэ, зарсан */}
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

              {/* Progress */}
              <div className="flex flex-col justify-center items-center mt-5">
                <h3 className="text-[#b19155] self-center flex">
                  {(item.soldNumber * 100) / item.totalNumber}% зарагдсан (
                  {item.totalNumber}-аас)
                </h3>
              </div>

              {/* Идэвхтэй үед */}
              {item.active ? (
                <>
                  {/* Худалдаж авах dialog */}
                  <Dialog
                    open={openDialog === item.id}
                    onOpenChange={(val) => setOpenDialog(val ? item.id : null)}
                  >
                    <DialogTrigger asChild>
                      <button className="w-full self-center mt-2 px-4 py-6 h-10 bg-black text-[#b19155] flex justify-center items-center font-bold text-lg rounded-lg border-2 border-[#b19155]">
                        Сугалаа худалдаж авах
                      </button>
                    </DialogTrigger>
                    {/* Dialog дотор Section2 шиг */}
                    {/* ... */}
                  </Dialog>

                  {/* Сугалаа шалгах dialog */}
                  <Dialog
                    open={openDialog2 === item.id}
                    onOpenChange={(val) => setOpenDialog2(val ? item.id : null)}
                  >
                    <DialogTrigger asChild>
                      <button className="w-full gap-3 self-center mt-2 px-4 py-6 h-10 bg-black text-[#b19155] flex justify-center items-center font-bold text-lg rounded-lg border-2 border-[#b19155]">
                        <CiSearch className="w-6 h-6" />
                        Сугалаа шалгах
                      </button>
                    </DialogTrigger>
                    {/* Dialog дотор Section2 шиг */}
                    {/* ... */}
                  </Dialog>
                </>
              ) : (
                <a
                  href={`/winner/${item.id}`}
                  className="w-full self-center mt-2 px-4 py-6 h-10 bg-black text-[#b19155] flex justify-center items-center font-bold text-lg rounded-lg border-2 border-[#b19155]"
                >
                  Азтанг харах
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
