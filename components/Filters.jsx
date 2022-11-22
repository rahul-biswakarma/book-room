import TextField from "@material-ui/core/TextField";

export default function Filters({ setAuthorQuery, setDateQuery }) {
  return (
    <div>
      <div className="flex justify-center items-center p-[1rem] gap-[2rem] flex-wrap">
        <div className="flex max-w-[500px] justify-center items-center gap-[1rem]">
          Author{" "}
          <input
            spellCheck="false"
            className="block w-full appearance-none rounded-lg transition-colors md:text-sm text-base leading-tight bg-white px-[0.8rem] py-[0.5rem] focus:outline-none text-black"
            type="search"
            placeholder="Search Author…"
            onChange={(e) => {
              setAuthorQuery(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center gap-[1rem]">
          Published{" "}
          <TextField
            className="block w-full appearance-none rounded-lg transition-colors md:text-sm text-base leading-tight px-[0.8rem] py-[0.5rem] focus:outline-none text-black"
            id="date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setDateQuery(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
