"use client";
import {
  Table,
  TableBody,
  TableCell,
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
    <div className="flex justify-center">
      <div className="w-[375px]">
        <h1 className="text-[#b19155] text-center text-2xl font-semibold">
          Сүүлийн ялагчид
        </h1>
        <Table className="bg-black border-2 border-[#b19155] mt-4 mb-5 table-fixed w-full text-sm">
          <TableHeader>
            <TableRow className="border-[#b19155]">
              <TableHead className="w-[80px] text-[#b19155] border-[#b19155] uppercase text-center">
                Нэр
              </TableHead>
              <TableHead className="w-[90px] text-[#b19155] border-[#b19155] uppercase text-center">
                Суглааны
                <br />
                дугаар
              </TableHead>
              <TableHead className="w-[95px] text-[#b19155] border-[#b19155] uppercase text-center">
                Хонжвор
              </TableHead>
              <TableHead className="w-[110px] text-[#b19155] border-[#b19155] uppercase text-center">
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
                <TableRow
                  key={winner._id}
                  className="border-[#b19155] hover:bg-[#1a1a1a]"
                >
                  <TableCell className="font-medium text-[#b19155] border-[#b19155] whitespace-normal break-words px-2 py-1 text-center">
                    {winner.name}
                  </TableCell>
                  <TableCell className="text-[#b19155] border-[#b19155] whitespace-normal break-words px-2 py-1 text-center">
                    {winner.ticketNumber}
                  </TableCell>
                  <TableCell className="text-[#b19155] border-[#b19155] whitespace-normal break-words px-2 py-1 text-center">
                    {winner.description}
                  </TableCell>
                  <TableCell className="text-[#b19155] border-[#b19155] whitespace-normal break-words px-2 py-1 text-center">
                    {formatted}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
