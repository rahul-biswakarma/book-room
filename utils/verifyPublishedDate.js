export default function VerifyPublishedDates(dates, dateQuery) {
  var found = false;
  try {
    var d1 = new Date(dateQuery);
    dates.map((date) => {
      var d2 = new Date(date);
      if (d1.getFullYear() === d2.getFullYear()) found = true;
    });
  } catch {}
  return found;
}
