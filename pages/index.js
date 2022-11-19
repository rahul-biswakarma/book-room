import Head from "next/head";
import React, { useState, useRef, useCallback } from "react";

import Card from "/components/Card";
import GetBooks from "/utils/GetBooks";
import Navbar from "/components/Navbar";

export default function App() {
  const [query, setQuery] = useState("the");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { books, hasMore, loading, error } = GetBooks(
    query,
    pageNumber,
    setTotalCount
  );

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="min-h-[100vh]">
      <Head>
        <title>BookRoom</title>
        <meta
          name="description"
          content="BookRoom is a simple library management web app that is built around openlibrary api"
        />
      </Head>
      <Navbar
        setPageNumber={setPageNumber}
        setQuery={setQuery}
        query={query}
        setTotalCount={setTotalCount}
      />
      <div className="text-cardTextSecondary text-lg text-center p-[3rem]">
        Showing <span className="font-bold">{totalCount}</span> books
      </div>
      <div className="flex gap-[2rem] flex-wrap justify-center items-center p-[3rem] bg-bodyBg">
        {books.map((book, index) => {
          if (books.length === index + 1) {
            return (
              <div ref={lastBookElementRef} key={`${index}${pageNumber}`}>
                <Card
                  cardId={index}
                  key={`${index}${pageNumber}`}
                  title={book.title}
                  authors={book.author}
                  coverId={book.coverId}
                  publishedDate={book.publishedDate}
                  amazonId={book.amazonId}
                />
              </div>
            );
          } else {
            return (
              <Card
                cardId={index}
                key={`${index}${pageNumber}`}
                title={book.title}
                authors={book.authors}
                coverId={book.coverId}
                publishedDate={book.publishedDate}
                amazonId={book.amazonId}
              />
            );
          }
        })}
      </div>
      <div className="text-center p-[1rem] font-bold text-cardTextSecondary ">
        {loading && "Loading..."}
      </div>
      <div className="text-center p-[1rem] font-bold text-cardTextSecondary ">
        {error && "Error"}
      </div>
    </div>
  );
}
