export default function Count(props) {
  return (
    <div className="text-cardTextSecondary text-lg text-center p-[2rem]">
      Showing{" "}
      <span id="books-count" className="font-bold">
        {}
      </span>{" "}
      / <span className="font-bold">{props.totalCount}</span> books
    </div>
  );
}
