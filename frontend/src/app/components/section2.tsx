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

export function Section2() {
  const [data, setData] = useState<Lottery[]>([]);
  const [formState, setFormState] = useState<{
    [id: number]: { phone: string; quantity: number; totalAmount: number };
  }>({});
  const [openDialog, setOpenDialog] = useState<null | number>(null);
  const [openDialog2, setOpenDialog2] = useState<null | number>(null);
  const [showConfirmation, setShowConfirmation] = useState<null | number>(null);
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/lottery")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  // handleInputChange
  const handleInputChange = (
    id: number,
    field: "phone" | "quantity",
    value: string | number,
    price?: number
  ) => {
    setFormState((prev) => {
      let newQuantity = prev[id]?.quantity ?? 0;

      if (field === "quantity") {
        // Хоосон үед quantity = 0
        newQuantity =
          value === "" || isNaN(Number(value)) || Number(value) <= 0
            ? 0
            : Number(value);
      }

      const totalAmount =
        price && newQuantity > 0 ? newQuantity * price : 0;

      return {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: field === "quantity" ? newQuantity : value,
          quantity: newQuantity, // үргэлж тоо хадгална
          totalAmount,
        },
      };
    });
  };

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
        body: JSON.stringify(item)
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
  const handleSearch = async (id: number) => {
    try {
      fetch("/api/participants/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.ok) {
          console.log("Success fetching participants");

        }
        return res.json();
      }).then((data) => {
        setParticipants(data.participants || []);
      });
    } catch (error) {
      console.log("Error fetching participants:", error);
    }
  };
  console.log("Participants:", participants);


  console.log(data)



  return (
    <div className="w-full flex justify-center items-center flex-col mt-15">
      <h1 className="self-start text-2xl ml-[75px] font-bold text-[#b19155]">
        Одоогийн Сугалаа
      </h1>

      {data.filter((r: any) => r.active === true).map((item) => {
        const phone = formState[item.id]?.phone || "";
        const quantity = formState[item.id]?.quantity || 0;
        const totalAmount = formState[item.id]?.totalAmount || 0;
        const isPhoneValid = /^\d{8}$/.test(phone)

        return (
          <div
            key={item.id}
            className="bg-black rounded-lg w-[354px] h-fit mt-5 border-[0.5px] border-[#2E3A4B] p-4"
          >
            <div className="flex justify-between">
              <h3 className={`${item.active ? "text-[#4ADE80]" : "text-red-600"}`}>
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
                      value={quantity === 0 ? "" : quantity}
                      onChange={(e) =>
                        handleInputChange(
                          item.id,
                          "quantity",
                          e.target.value,
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
                    disabled={!isPhoneValid || quantity <= 0}
                    onClick={() => {
                      setOpenDialog(null);
                      setShowConfirmation(item.id);

                    }}
                  >
                    Худалдаж авах
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>


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
                      <Button onClick={() => handleSubmit(item.id)} variant="outline">Хаах</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            )}
            <Dialog
              open={openDialog2 === item.id}
              onOpenChange={(val) => setOpenDialog2(val ? item.id : null)}
            >
              <DialogTrigger asChild>
                <button className="w-full gap-3  self-center mt-2 px-4 py-6 h-10 bg-black text-[#b19155] flex justify-center items-center font-bold text-lg rounded-lg border-2 border-[#b19155]">
                  <CiSearch className="w-6 h-6" />
                  Сугалаа шалгах
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Сугалаа шалгах</DialogTitle>


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



                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Болих</Button>
                  </DialogClose>
                  <Button
                    type="button"
                    disabled={!isPhoneValid}
                    onClick={() => {
                      setOpenDialog(null);
                      setShowConfirmation(item.id);
                      handleSearch(item.id);

                    }}
                  >
                    Шалгах
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>


            {showConfirmation === item.id && (
              <Dialog
                open={true}
                onOpenChange={() => setShowConfirmation(null)}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center">

                    </DialogTitle>
                    <DialogDescription className="text-center">

                    </DialogDescription>
                  </DialogHeader>

                  {participants.length > 0 ? (
                    <div className="mt-4 text-[#b19155] text-center">
                      <p>Таны тасалбарын мэдээлэл:</p>
                      <div>
                        <div className="grid grid-cols-3 bg-gray-100 font-semibold  p-2 border-b border-gray-300">
                          <div>Утасны дугаар</div>
                          <div>Тасалбарын дугаар</div>
                          <div>Хугацаа</div>
                        </div>
                      </div>
                      {participants
                        .filter((r: any) => r.phoneNumber === phone)
                        .map((r: any) => (
                          <div
                            key={String(r._id)}
                            className="grid grid-cols-3 p-2 border-b border-gray-300 hover:bg-gray-50"
                          >
                            <div>{r.phoneNumber}</div>
                            <div>{r.ticketNumber}</div>
                            <div>{r.soldAt ? new Date(r.soldAt).toLocaleString() : "N/A"}</div>
                          </div>
                        ))}

                    </div>
                  ) : (
                    <p className="text-gray-500 p-3">
                      Таны тасалбарын мэдээлэл олдсонгүй
                    </p>
                  )}




                  <DialogFooter>
                    <DialogClose asChild>
                      <Button onClick={() => handleSubmit(item.id)} variant="outline">Хаах</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>)}
          </div>
        );
      })}
      {data.filter((r: any) => r.active === false).map((item) => {
        const phone = formState[item.id]?.phone || "";
        const quantity = formState[item.id]?.quantity || 0;
        const totalAmount = formState[item.id]?.totalAmount || 0;
        const isPhoneValid = /^\d{8}$/.test(phone)

        return (
          <div
            key={item.id}
            className="bg-black rounded-lg w-[354px] h-fit mt-5 border-[0.5px] border-[#2E3A4B] p-4"
          >
            <div className="flex justify-between">
              <h3 className={`${item.active ? "text-[#4ADE80]" : "text-red-600"}`}>
                {item.active ? "Идэвхтэй" : "Идэвхгүй"}
              </h3>
              <h4 className="text-[#b19155]">{new Date(item.endedAt).toISOString().split("T")[0]}</h4>
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
                {Math.floor((item.soldNumber * 100) / item.totalNumber)}% зарагдсан (
                {item.totalNumber}-аас)
              </h3>
            </div>



            <a href={`/winner/${item.id}`} className="w-full self-center mt-2 px-4 py-6 h-10 bg-black text-[#b19155] flex justify-center items-center font-bold text-lg rounded-lg border-2 border-[#b19155]">
              Азтанг харах
            </a>
          </div>
        );
      })}
    </div>
  );
}
