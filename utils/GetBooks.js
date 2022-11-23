import { useEffect, useState } from "react";
import axios from "axios";

export default function useBookSearch(query, pageNumber, setTotalCount) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let axiosCancelToken;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber, limit: 10 },
      cancelToken: new axios.CancelToken((c) => (axiosCancelToken = c)),
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [
            ...new Set([
              ...prevBooks,
              ...res.data.docs.map((b) => {
                return {
                  title: b.title,
                  authors: b.author_name,
                  coverId: b.cover_i,
                  publishedDate: b.publish_date,
                  amazonId: b.id_amazon,
                  seed: b.seed,
                };
              }),
            ]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setTotalCount(res.data.docs.length * pageNumber);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => axiosCancelToken();
  }, [query, pageNumber]);

  return { loading, error, books, hasMore };
}
