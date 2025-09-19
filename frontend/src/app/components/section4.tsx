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

type Winner = {
  _id: string;
  name: string;
  ticketNumber: string;
  description: string;
  totalAmount: string;
  endedAt: string; 
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

  return (
    <>
      <h1 className="text-[#b19155] text-center">Сүүлийн ялагчид</h1>
      <Table className="bg-black border-2 border-[#b19155] mt-4 ">
        <TableHeader>
          <TableRow className="border-[#b19155]">
            <TableHead className="w-[100px] text-[#b19155] border-[#b19155]">
              Нэр
            </TableHead>
            <TableHead className="text-[#b19155] border-[#b19155]">
              Суглааны <h1 className="ml-2 mb-2">дугаар</h1>
            </TableHead>
            <TableHead className="text-[#b19155] border-[#b19155]">
              Хонжвор
            </TableHead>
            <TableHead className="text-right text-[#b19155] border-[#b19155]">
              Он сар
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {winners.map((winner: Winner) => {
            const date = new Date(winner.endedAt);
            const formatted = date.toLocaleDateString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });

            return (
              <TableRow key={winner._id} className="border-[#b19155] ">
                <TableCell className="font-medium text-[#b19155] border-[#b19155]">
                  {winner.name}
                </TableCell>
                <TableCell className="text-[#b19155] border-[#b19155]">
                  {winner.ticketNumber}
                </TableCell>
                <TableCell className="text-[#b19155] border-[#b19155]">
                  {winner.description}
                </TableCell>
                <TableCell className="text-right text-[#b19155] border-[#b19155]">
                  {formatted}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
