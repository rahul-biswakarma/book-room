export default function Count() {
  return (
    <div className="text-cardTextSecondary text-lg text-center p-[3rem]">
      Showing{" "}
      <span id="books-count" className="font-bold">
        {}
      </span>{" "}
      books
    </div>
  );
}
