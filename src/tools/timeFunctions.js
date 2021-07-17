export function day_month_year(dateInMilliseconds) {
  let time = new Date(parseInt(dateInMilliseconds));
  return time.toLocaleString();
  // return result;
}
