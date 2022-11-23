import TextField from "@material-ui/core/TextField";

export default function Filters({
  setAuthorQuery,
  setDateQuery,
  query,
  setQuery,
  setPageNumber,
  setTotalCount,
}) {
  function handleTitleSearch(e) {
    if (e.target.value != "") setQuery(e.target.value);
    else setQuery("the");
    setPageNumber(1);
    setTotalCount(0);
  }
  return (
    <div>
      <div className="flex justify-center items-center p-[2rem] gap-[2rem] flex-wrap">
        <div className="flex items-center gap-[1rem]">
          <span>Title/Keyword </span>
          <input
            spellCheck="false"
            className="block w-full appearance-none rounded-lg transition-colors md:text-sm text-base leading-tight bg-white px-[0.8rem] py-[0.5rem] focus:outline-none text-black"
            type="search"
            placeholder="Search books…"
            onChange={handleTitleSearch}
          />
        </div>
        <div className="flex max-w-[500px] items-center gap-[1rem]">
          <span>Author</span>
          <input
            spellCheck="false"
            className="block w-full appearance-none rounded-lg transition-colors md:text-sm text-base leading-tight bg-white px-[0.8rem] py-[0.5rem] focus:outline-none text-black"
            type="search"
            placeholder="Search Author..."
            onChange={(e) => {
              setAuthorQuery(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-[1rem]">
          <span className="w-[150px]">Publish Year</span>
          <input
            className="block w-full appearance-none rounded-lg transition-colors md:text-sm text-base leading-tight bg-white px-[0.8rem] py-[0.5rem] focus:outline-none text-black"
            placeholder="Year..."
            type="number"
            min={1000}
            max={9999}
            onChange={(e) => setDateQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
