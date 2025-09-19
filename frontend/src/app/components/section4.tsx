"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
type Invoice = {
  Дугаар: React.ReactNode;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
};

type Winner = {
  id: string;
  name: string;
  ticketNumber: string;
  description: string;
  totalAmount: string;
};

export function Section4() {
  const [winners, setWinners] = useState<Winner[]>([]);
  useEffect(() => {
    fetch("/api/winner")
      .then((res) => res.json())
      .then((data) => {
        const mergedWinners = data.flatMap((item: any) => item.winners || []);
        setWinners(mergedWinners);
      });
  }, []);
  console.log("++++++++++++++++++++", winners);
  return (
    <>
      <h1 className="text-[#b19155] text-center">Suulin yalagchud</h1>
      <Table className="bg-black border-3 border-[#b19155] mt-4 ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-[#b19155]">Нэр</TableHead>
            <TableHead className="text-[#b19155]">
              Суглааны <h1>дугаар</h1>
            </TableHead>
            <TableHead className=" text-[#b19155]">Хонжвор</TableHead>
            <TableHead className="text-right text-[#b19155]">Он сар</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {winners.map((Дугаар: Invoice) => (
            <TableRow key={Дугаар.id}>
              <TableCell className="font-medium text-[#b19155]">
                {Дугаар.name}
              </TableCell>
              <TableCell className="text-[#b19155]">
                {Дугаар.ticketNumber}
              </TableCell>
              <TableCell className="text-[#b19155]">
                {Дугаар.description}
              </TableCell>
              <TableCell className="text-right  text-[#b19155]">
                {Дугаар.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
