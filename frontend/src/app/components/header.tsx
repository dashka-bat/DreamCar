import Image from "next/image";

export function Header() {
  return (
    <div className="bg-black w-full h-20 z-10 border-b-[0.5px] border-gray-600 flex px-4 justify-between">
      <div className="flex items-center ">
        <Image src="/logo.png" alt="logo" width={40} height={40} />{" "}
        <div className="text-[#b19155] ml-2">
          <h1 className="font-extrabold text-xl">Dream Car Live</h1>
          <h1 className="font-extrabold text-xl ml-3">Online shop</h1>
        </div>
      </div>

      <div className="flex flex-col justify-center cursor-pointer space-y-1">
        <span className="w-5 h-0.5 bg-[#b19155] rounded-md"></span>
        <span className="w-5 h-0.5 bg-[#b19155] rounded-md"></span>
        <span className="w-5 h-0.5 bg-[#b19155] rounded-md"></span>
      </div>
    </div>
  );
}
