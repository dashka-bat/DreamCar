import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdHome } from "react-icons/md";
import { FaTicketSimple } from "react-icons/fa6";
import { GiPodiumWinner } from "react-icons/gi";
import { FaBookMedical } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog"; // DialogTitle импорт
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // VisuallyHidden импорт

export function Header() {
  return (
    <div className="bg-black w-full h-20 z-10 border-b-[0.5px] border-[#b19155] flex px-4 justify-between">
      <Link href="/" className="flex items-center">
        <div className="flex items-center">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
          <div className="text-[#b19155] ml-2">
            <h1 className="font-extrabold text-xl">Dream Car Live</h1>
            <h1 className="font-extrabold text-xl ml-3">Online shop</h1>
          </div>
        </div>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <div>
            <Button variant="outline" className="bg-black border-0">
              <div className="flex flex-col justify-center cursor-pointer space-y-1 mt-10">
                <span className="w-7 h-1 bg-[#b19155] rounded-md"></span>
                <span className="w-7 h-1 bg-[#b19155] rounded-md"></span>
                <span className="w-7 h-1 bg-[#b19155] rounded-md"></span>
              </div>
            </Button>
          </div>
        </SheetTrigger>

        <SheetContent className="bg-black text-[#b19155] shadow-xl">
          {/* Accessibility-д зориулсан DialogTitle */}
          <DialogTitle>
            <VisuallyHidden>Navigation Menu</VisuallyHidden>
          </DialogTitle>

          <div className="flex flex-col mt-20 gap-4 mr-3 ml-3">
            <Link href="/" className="group">
              <div className="flex items-center border-2 border-[#b19155] gap-4 p-4 rounded-xl bg-black hover:bg-[#b19155] transition-colors duration-300 cursor-pointer shadow-lg">
                <MdHome className="w-8 h-8 text-[#b19155] group-hover:text-black transition-colors duration-300" />
                <h1 className="text-xl font-semibold text-[#b19155] group-hover:text-black transition-colors duration-300">
                  Нүүр хуудас
                </h1>
              </div>
            </Link>
            <Link href="/lottery" className="group">
              <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#b19155] bg-black hover:bg-[#b19155] transition-colors duration-300 cursor-pointer shadow-lg">
                <FaTicketSimple className="w-8 h-8 text-[#b19155] hover:text-black transition-colors duration-300" />
                <h1 className="text-xl font-semibold text-[#b19155] hover:text-black transition-colors duration-300">
                  Сугалаанууд
                </h1>
              </div>
            </Link>
            <Link href="/winners" className="group">
              <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#b19155] bg-black hover:bg-[#b19155] transition-colors duration-300 cursor-pointer shadow-lg">
                <GiPodiumWinner className="w-8 h-8 text-[#b19155] hover:text-black transition-colors duration-300" />
                <h1 className="text-xl font-semibold text-[#b19155] hover:text-black transition-colors duration-300">
                  Ялагчид
                </h1>
              </div>
            </Link>
            <Link href={"/direction"} className="group">
              <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#b19155] bg-black hover:bg-[#b19155] transition-colors duration-300 cursor-pointer shadow-lg">
                <FaBookMedical className="w-8 h-8 text-[#b19155] hover:text-black transition-colors duration-300" />
                <h1 className="text-md font-semibold text-[#b19155] hover:text-black transition-colors duration-300">
                  Сугалаа авах заавар
                </h1>
              </div>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
