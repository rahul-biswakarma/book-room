import Link from "next/link";

export default function Navbar(props) {
  function handleSearch(e) {
    props.setQuery(e.target.value);
    props.setPageNumber(1);
  }
  return (
    <div className="sticky top-[0px] left-[0px] w-full z-50">
      <div className="flex justify-between items-center px-hNavPad py-vNavPad bg-navBg gap-[2rem] ">
        <div className="font-krona uppercase text-[19px] text-white">
          BookRoom
        </div>

        <div className="flex gap-[1rem] items-center w-full justify-end text-white/70">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <div className="w-full max-w-[300px]">
            <input
              spellCheck="false"
              className="block w-full appearance-none rounded-lg transition-colors md:text-sm text-base leading-tight bg-navSearchBg placeholder:text-bodyBg px-[0.8rem] py-[0.5rem] focus:outline-none"
              type="search"
              placeholder="Search books…"
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
