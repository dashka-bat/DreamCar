import Image from "next/image";

export function Header() {
  return (
    <div className="bg-black w-full h-[120px] z-10">
      <Image src="/dreamcar.jpg" alt="logo" width={80} height={80} />
    </div>
  );
}
