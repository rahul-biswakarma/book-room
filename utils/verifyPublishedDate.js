export default function VerifyPublishedDates(dates, dateQuery) {
  var found = false;
  var displayDate = 0;
  try {
    dates.map((date) => {
      var d1 = new Date(date);
      if (d1.getFullYear() == dateQuery) {
        found = true;
        displayDate = d1;
      }
    });
  } catch {}
  return { found, displayDate };
}
