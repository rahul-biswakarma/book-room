import { useEffect, useState, useRef, useCallback } from "react";

import Card from "/components/Card.jsx";

const fetchData = async () => {
  const response = await fetch("/api/books?limit=20&offset=100");
  const body = await response.json();
  return body;
};

export default function Home() {
  const [books, setBooks] = useState([]);
  const [pageNumber, setPageNumeber] = useState(1);
  const [bookPerPage, setBookPerPage] = useState(12);

  useEffect(() => {
    fetchData().then((data) => {
      data.map((book) => {
        setBooks((books) => [...new Set([...books, book])]);
      });
    });
  }, [pageNumber]);

  return (
    <div className="flex gap-[2rem] flex-wrap justify-center items-center p-[3rem] bg-bodyBg">
      {books.length > 0 ? (
        books.map((book) => {
          return (
            <Card
              key={book.title}
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
        })
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
