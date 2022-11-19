export default function VerifyAuthor(authors, authorQuery) {
  var found = false;
  try {
    authors.map((author) => {
      let a = author.toLowerCase();
      let b = authorQuery.toLowerCase();
      if (a.includes(b)) found = true;
    });
  } catch {}
  return found;
}
