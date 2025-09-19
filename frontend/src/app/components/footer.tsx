import Link from "next/link";
import { FaBookMedical, FaTicketSimple } from "react-icons/fa6";
import { GiPodiumWinner } from "react-icons/gi";
import { MdHome } from "react-icons/md";

export function Footer() {
  return (
    <div className="w-full h-[70px] bg-black">
      <div className="flex justify-between items-center px-4 h-full">
        <Link href="/" className="flex items-center">
          <button className="flex flex-col items-center text-[#b19155] hover:text-[#ffd97a] hover:font-bold active:scale-95 transition duration-200">
            <MdHome className="w-8 h-8" />
            <h1 className="text-sm">Нүүр</h1>
          </button>
        </Link>
        <Link href="/lottery" className="flex items-center">
          <button className="flex flex-col items-center text-[#b19155] hover:text-[#ffd97a] hover:font-bold active:scale-95 transition duration-200">
            <FaTicketSimple className="w-8 h-8" />
            <h1 className="text-sm">Сугалаа</h1>
          </button>
        </Link>
        <Link href="/winners" className="flex items-center">
          <button className="flex flex-col items-center text-[#b19155] hover:text-[#ffd97a] hover:font-bold active:scale-95 transition duration-200">
            <GiPodiumWinner className="w-8 h-8" />
            <h1 className="text-sm">Ялагчид</h1>
          </button>
        </Link>

        <button className="flex flex-col items-center text-[#b19155] hover:text-[#ffd97a] hover:font-bold active:scale-95 transition duration-200 mt-1">
          <FaBookMedical className="w-7 h-7" />
          <h1 className="text-sm"> Заавар</h1>
        </button>
      </div>
    </div>
  );
}
