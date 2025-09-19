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

export function Section2() {
  const [data, setData] = useState<Lottery[]>([]);
  const [formState, setFormState] = useState<{
    [id: number]: { phone: string; quantity: number; totalAmount: number };
  }>({});
  const [openDialog, setOpenDialog] = useState<null | number>(null);
  const [showConfirmation, setShowConfirmation] = useState<null | number>(null);

  useEffect(() => {
    fetch("/api/lottery")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleInputChange = (
    id: number,
    field: "phone" | "quantity",
    value: string | number,
    price?: number
  ) => {
    setFormState((prev) => {
      const newQuantity =
        field === "quantity" ? Number(value) : prev[id]?.quantity || 1;
      const totalAmount = price
        ? newQuantity * price
        : prev[id]?.totalAmount || 0;

      return {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value,
          totalAmount,
        },
      };
    });
  };

  return (
    <div className="w-full flex justify-center items-center flex-col mt-15">
      <h1 className="self-start text-2xl ml-[75px] font-bold text-[#b19155]">
        Одоогийн Сугалаа
      </h1>

      {data.map((item) => {
        const phone = formState[item.id]?.phone || "";
        const quantity = formState[item.id]?.quantity || 1;
        const totalAmount = formState[item.id]?.totalAmount || item.price;
        const isPhoneValid = /^\d{8}$/.test(phone);

        return (
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

            {/* Анхны dialog: мэдээлэл авах */}
            <Dialog
              open={openDialog === item.id}
              onOpenChange={(val) => setOpenDialog(val ? item.id : null)}
            >
              <DialogTrigger asChild>
                <button className="w-full self-center mt-2 px-4 py-6 h-10 bg-black text-[#b19155] flex justify-center items-center font-bold text-lg rounded-lg border-2 border-[#b19155]">
                  Сугалаа худалдаж авах
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Сугалаа авах</DialogTitle>
                  <DialogDescription>
                    {item.name} сугалааг авахын тулд мэдээллээ оруулна уу.
                  </DialogDescription>
                  <div>Сугaлаа батлгаажих хүртэл хүлээнэ үү (2-6 цаг)</div>
                </DialogHeader>

                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor={`phone-${item.id}`}>Утасны дугаар</Label>
                    <Input
                      id={`phone-${item.id}`}
                      value={phone}
                      onChange={(e) =>
                        handleInputChange(item.id, "phone", e.target.value)
                      }
                      placeholder="99112233"
                    />
                    {!isPhoneValid && phone.length > 0 && (
                      <p className="text-red-500 text-sm">
                        Утасны дугаар 8 оронтой байх ёстой!
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor={`quantity-${item.id}`}>
                      Тасалбарын тоо
                    </Label>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) =>
                        handleInputChange(
                          item.id,
                          "quantity",
                          Number(e.target.value),
                          item.price
                        )
                      }
                    />
                  </div>

                  <div className="text-[#b19155] font-bold mt-2">
                    Нийт төлбөр: {totalAmount}₮
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Болих</Button>
                  </DialogClose>
                  <Button
                    type="button"
                    disabled={!isPhoneValid}
                    onClick={() => {
                      setOpenDialog(null); // Анхны dialog-г хаах
                      setShowConfirmation(item.id); // Баталгаажсан dialog-г гаргах
                    }}
                  >
                    Худалдаж авах
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Хоёр дахь dialog: баталгаажсан мэдээлэл */}
            {showConfirmation === item.id && (
              <Dialog
                open={true}
                onOpenChange={() => setShowConfirmation(null)}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Гүйлгээний мэдээлэл
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Та дараах гүйлгээг хийж сугалаагаа аваарай: <br />
                      Сугалааны дугаар ажлын өдөр 2-8 цагийн дотор шивэгдэж
                      орно, сайтаараа шалгаарай
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-4 text-[#b19155] text-center">
                    <p>Үнийн дүн: {totalAmount} ₮</p>
                    <p>Гүйлгээний утга: {phone}</p>
                    <p>
                      Шилжүүлэх данс: <br />
                      Данс: 5400982870 Хаан банк <br />
                      IBAN: MN770005005400982870 <br />
                      Нэр: Хулан
                    </p>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Хаах</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        );
      })}
    </div>
  );
}
