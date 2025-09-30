import { Button } from "@/components/ui/button";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { MdOutlineContactPage } from "react-icons/md";
export function Section1() {
  return (
    <div className="mt-8 flex flex-col jutsify-center items-center bg-black">
      <h1 className="text-[32px]  text-[#b19155] ">Автомашины Сугалаа</h1>
      <h2 className="text-md mt-2  text-[#b19155] mb-6 self-center text-[22px]">
        Та мөрөөдлийн машинаа
        <div>Xүлээн авах боломжтой</div>
      </h2>
<Image width={370} height={200}  alt="s"src={"/facebook.png"}></Image>
 <a
              href="https://www.facebook.com/dreamcar.mn"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className=" mt-6 flex items-center gap-4 p-4 rounded-xl border-2 border-[#b19155] bg-black hover:bg-[#b19155] transition-colors duration-300 cursor-pointer shadow-lg">
                <MdOutlineContactPage className="w-6 h-6 text-[#b19155] hover:text-black transition-colors duration-300" />
                <h1 className="text-md font-semibold text-[#b19155] hover:text-black transition-colors duration-300">
                  Page Хуудас-руу очих
                </h1>
              </div>
            </a>
      {/* <Marquee className="gap-100" speed={50} pauseOnHover={true}>
        <Image width={300} height={100} src={"/4.png"} alt=""></Image>
        <Image width={300} height={100} src={"/5.png"} alt=""></Image>
        <Image width={300} height={100} src={"/6.png"} alt=""></Image>
      </Marquee> */}
      {/* <div className="bg-white rounded-lg p-4 w-full">
        <img src="/sample.png" className="rounded-lg w-full h-60 object-cover"></img>
      </div> */}
    </div>
  );
}
