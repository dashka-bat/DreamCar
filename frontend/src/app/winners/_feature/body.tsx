"use client";
import { useEffect, useState } from "react";

type Winner = {
  _id: string;
  name: string;
  ticketNumber: string;
  description: string;
  endedAt: string;
};

export function Body() {
  const [winners, setWinners] = useState<Winner[]>([]);

  useEffect(() => {
    fetch("/api/winner")
      .then(res => res.json())
      .then(data => {
        const mergedWinners = data.flatMap((item: any) => item.winners || []);
        setWinners(mergedWinners);
      });
  }, []);

  return (
    <div className="flex justify-center w-full overflow-x-hidden">
      <div className="w-full max-w-[375px] px-2">
        <div className="hidden sm:flex bg-black border-b-2 border-[#b19155] mt-4 text-[#b19155] text-sm">
          <div className="w-1/3 text-center font-semibold py-1 border-r border-[#b19155]">
            Нэр
          </div>
          <div className="w-1/3 text-center font-semibold py-1 border-r border-[#b19155]">
            Суглааны дугаар
          </div>
          <div className="w-1/3 text-center font-semibold py-1">
            Он сар
          </div>
        </div>
        <div className="mt-2 space-y-4">
          {winners.map((winner) => {
            const date = new Date(winner.endedAt);
            const formatted = date.toLocaleDateString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });

            return (
              <div
                key={winner._id}
                className="bg-black border border-[#b19155] rounded-md text-[#b19155] overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/3 text-center py-2 border-b sm:border-b-0 sm:border-r border-[#b19155] font-semibold">
                    {winner.name}
                  </div>
                  <div className="w-full sm:w-1/3 text-center py-2 border-b sm:border-b-0 sm:border-r border-[#b19155]">
                    {winner.ticketNumber}
                  </div>
                  <div className="w-full sm:w-1/3 text-center py-2">
                    {formatted}
                  </div>
                </div>
                <div className="px-2 py-2 text-center text-base border-t border-[#b19155] break-words">
                  {winner.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

