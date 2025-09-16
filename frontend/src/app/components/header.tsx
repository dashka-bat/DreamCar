import Image from "next/image";

export function Header() {
  return (
    <div className="bg-black w-full h-20 z-10 border-b-[0.5px] border-gray-600 flex px-4 justify-between">
      <div className="flex items-center space-x-2">
        <Image src="/dreamcar.jpg" alt="logo" width={40} height={40} />
        <h1 className="font-extrabold text-xl">Dream Car Live</h1>
      </div>

      <div className="flex flex-col justify-center cursor-pointer space-y-1">
        <span className="w-5 h-0.5 bg-white rounded-md"></span>
        <span className="w-5 h-0.5 bg-white rounded-md"></span>
        <span className="w-5 h-0.5 bg-white rounded-md"></span>
      </div>
    </div>
  );
}
