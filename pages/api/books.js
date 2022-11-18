import BooksData from "/public/data/books.json";

export default function handler(req, res) {
  res.status(200).json(BooksData);
}
