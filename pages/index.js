import Head from "next/head";
import React, { useState, useRef, useCallback, useEffect } from "react";

import Card from "/components/Card";
import Count from "/components/Count";
import Navbar from "/components/Navbar";
import Filters from "/components/Filters";

import GetBooks from "/utils/GetBooks";
import VerifyAuthor from "/utils/verifyAuthor";
import updateBookCount from "/utils/updateBookCount";
import VerifyPublishedDates from "/utils/verifyPublishedDate";

export default function App() {
  const [query, setQuery] = useState("the");
  const [authorQuery, setAuthorQuery] = useState("");
  const [dateQuery, setDateQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { books, hasMore, loading, error } = GetBooks(
    query,
    pageNumber,
    setTotalCount
  );

  useEffect(() => {
    updateBookCount();
  });

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
      {/* HTML Head */}
      <Head>
        <title>BookRoom</title>
        <meta
          name="description"
          content="BookRoom is a simple library management web app that is built around openlibrary api"
        />
      </Head>
      {/*  Navbar */}
      <Navbar />
      {/* Filter Input*/}
      <Filters
        setAuthorQuery={setAuthorQuery}
        setDateQuery={setDateQuery}
        setPageNumber={setPageNumber}
        setQuery={setQuery}
        query={query}
        setTotalCount={setTotalCount}
      />
      {/* Showing book count */}
      <Count totalCount={totalCount} />
      
      {/* Rendering Cards from API */}
      <div
        id="books-container"
        className="flex gap-[2rem] flex-wrap justify-center items-center p-[3rem] bg-bodyBg"
      >
        {books.map((book, index) => {
          if (VerifyAuthor(book.authors, authorQuery) || authorQuery === "") {
            if (
              VerifyPublishedDates(book.publishedDate, dateQuery).found ||
              dateQuery == ""
            ) {
              return (
                <Card
                  cardId={index}
                  key={`${index}${pageNumber}`}
                  title={book.title}
                  authors={book.authors}
                  coverId={book.coverId}
                  publishedDate={book.publishedDate}
                  amazonId={book.amazonId}
                  seed={book.seed}
                  displayDate={
                    VerifyPublishedDates(book.publishedDate, dateQuery)
                      .displayDate
                  }
                />
              );
            }
          }
        })}
      </div>

      {/* Load on Scroll ref  */}
      <div
        ref={lastBookElementRef}
        className="text-center p-[1rem] font-bold text-cardTextSecondary "
      >
        {loading && "Loading..."}
      </div>

      {/* Display error */}
      <div className="text-center p-[1rem] font-bold text-cardTextSecondary ">
        {error && "Error"}
      </div>
    </div>
  );
}
