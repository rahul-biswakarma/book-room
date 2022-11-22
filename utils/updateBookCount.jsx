export default function updateBookCount() {
  setInterval(() => {
    try {
      document.getElementById("books-count").innerHTML =
        document.getElementById("books-container").childElementCount;
    } catch {}
  }, 1000);
}
