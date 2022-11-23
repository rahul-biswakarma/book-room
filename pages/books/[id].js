import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "/components/Navbar";

export default function Book() {
  const router = useRouter();
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    if (!router.isReady) return;
    var bookId = router.query.id;
    fetch(`https://openlibrary.org/books/${bookId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setBookData(data);
      });
  }, [router.isReady]);

  console.log(bookData);

  return (
    <div>
      <Navbar />
      Books
    </div>
  );
}
