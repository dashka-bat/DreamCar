import Marquee from "react-fast-marquee";
export function Section1() {
  return (
    <div className="mt-8 flex flex-col jutsify-center items-center">
      {/* <Marquee></Marquee> */}
      <h1 className="text-2xl font-black">Автомашины Сугалаа</h1>
      <h2 className="text-md mt-2 text-[#777d86] mb-6 self-center text-[15px]">Та мөрөөдлийн машинаа хүлээн авах боломжтой</h2>

      <div className="bg-white rounded-lg p-4 w-full">
        <img src="/sample.png" className="rounded-lg w-full h-60 object-cover"></img>
      </div>
    </div>
  );
}
