const booksPerPage = 9;

export async function getAllBooks(pageNumber = 1) {
  const response = await fetch("/api/books");
  const body = await response.json();
  let end = pageNumber * booksPerPage;
  if (end > body.length) end = body.length;

  let newBody = body.slice(0, end);

  return { totalCount: body.length, currCount: newBody.length, body: newBody };
}
