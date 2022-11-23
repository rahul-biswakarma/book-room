import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-[0px] left-[0px] w-full z-50">
      <div className="flex justify-between items-center px-hNavPad py-vNavPad bg-navBg gap-[2rem] ">
        <div className="font-krona uppercase text-[19px] text-white">
          BookRoom
        </div>

        <div className="flex gap-[1rem] items-center w-full justify-end text-white/70">
          <Link href="/">Home</Link>
        </div>
      </div>
    </div>
  );
}
