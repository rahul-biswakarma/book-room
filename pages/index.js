import Head from "next/head";
import React, { useState, useRef, useCallback } from "react";

import Card from "/components/Card";
import GetBooks from "/utils/GetBooks";
import Navbar from "/components/Navbar";
import VerifyAuthor from "/utils/verifyAuthor";

export default function App() {
  const [query, setQuery] = useState("the");
  const [authorQuery, setAuthorQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { books, hasMore, loading, error } = GetBooks(
    query,
    pageNumber,
    setTotalCount
  );

  function handleAuthorQuery(e) {
    setAuthorQuery(e.target.value);
  }

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
      <Navbar
        setPageNumber={setPageNumber}
        setQuery={setQuery}
        query={query}
        setTotalCount={setTotalCount}
      />

      {/* Author Filter Input*/}
      <div>
        <div className="flex justify-center items-center p-[1rem]">
          <div className="flex max-w-[500px] justify-center items-center gap-[1rem]">
            Author{" "}
            <input
              spellCheck="false"
              className="block w-full appearance-none rounded-lg transition-colors md:text-sm text-base leading-tight bg-white px-[0.8rem] py-[0.5rem] focus:outline-none text-black"
              type="search"
              placeholder="Search Author…"
              onChange={handleAuthorQuery}
            />
          </div>
        </div>
      </div>

      {/* Showing book count */}
      <div className="text-cardTextSecondary text-lg text-center p-[3rem]">
        Showing <span className="font-bold">{totalCount}</span> books
      </div>

      {/* Rendering Cards from API */}
      <div className="flex gap-[2rem] flex-wrap justify-center items-center p-[3rem] bg-bodyBg">
        {books.map((book, index) => {
          if (VerifyAuthor(book.authors, authorQuery) || authorQuery === "") {
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
