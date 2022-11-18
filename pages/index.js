import { useEffect, useState } from "react";

import Card from "/components/Card.jsx";
import { getAllBooks } from "/utils/GetBook";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [currCount, setCurrCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastCard, setLastCard] = useState(8);

  useEffect(() => {
    const onScroll = () => {
      setLastCard(books.length - 1);
      var myElement = document.getElementById(`card-${lastCard}`);
      try {
        var bounding = myElement.getBoundingClientRect();

        if (
          bounding.top >= 0 &&
          bounding.left >= 0 &&
          bounding.right <= window.innerWidth &&
          bounding.bottom <= window.innerHeight
        ) {
          setPageNumber(pageNumber + 1);
          setLastCard(books.length - 1);
        }
      } catch {}
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  useEffect(() => {
    getAllBooks(pageNumber).then((data) => {
      setBooks([]);
      setCurrCount(data.currCount);
      setTotalCount(data.totalCount);
      data.body.map((book) => {
        setBooks((prevBooks) => {
          return [...new Set([...prevBooks, book])];
        });
      });
    });
  }, [pageNumber]);

  return (
    <>
      <div className="text-cardTextSecondary text-lg text-center p-[3rem]">
        Showing <span className="font-bold">{currCount}</span> out of{" "}
        <span className="font-bold">{totalCount}</span> books
      </div>
      <div className="flex gap-[2rem] flex-wrap justify-center items-center p-[3rem] bg-bodyBg">
        {books.length > 0 ? (
          books.map((book, index) => {
            if (books.length === index + 1) {
              return (
                <Card
                  id={`card-${index}`}
                  key={index}
                  author={book.author}
                  title={book.title}
                  publishedDate={book.updated_date}
                  imgSrc={book.book_image}
                  imgWidth={book.book_image_width}
                  imgHeight={book.book_image_height}
                  buyLink={book.amazon_product_url}
                  bookLink={book.book_review_link}
                />
              );
            } else {
              return (
                <Card
                  id={`card-${index}`}
                  key={index}
                  author={book.author}
                  title={book.title}
                  publishedDate={book.updated_date}
                  imgSrc={book.book_image}
                  imgWidth={book.book_image_width}
                  imgHeight={book.book_image_height}
                  buyLink={book.amazon_product_url}
                  bookLink={book.book_review_link}
                />
              );
            }
          })
        ) : (
          <>Loading</>
        )}
      </div>
    </>
  );
}
