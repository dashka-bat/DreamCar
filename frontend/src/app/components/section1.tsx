import Image from "next/image";
import Marquee from "react-fast-marquee";
export function Section1() {
  return (
    <div className="mt-8 flex flex-col jutsify-center items-center">
      <h1 className="text-[32px] text-black ">Автомашины Сугалаа</h1>
      <h2 className="text-md mt-2 text-black mb-6 self-center text-[22px]">
        Та мөрөөдлийн машинаа
        <div>Xүлээн авах боломжтой</div>
      </h2>

      <Marquee className="gap-44">
        <Image width={300} height={100} src={"/1.png"} alt=""></Image>
        <Image width={300} height={100} src={"/2.png"} alt=""></Image>
        <Image width={300} height={100} src={"/3.png"} alt=""></Image>
        <Image width={300} height={100} src={"/4.png"} alt=""></Image>
        <Image width={300} height={100} src={"/5.png"} alt=""></Image>
        <Image width={300} height={100} src={"/6.png"} alt=""></Image>
      </Marquee>
      {/* <div className="bg-white rounded-lg p-4 w-full">
        <img src="/sample.png" className="rounded-lg w-full h-60 object-cover"></img>
      </div> */}
    </div>
  );
}
