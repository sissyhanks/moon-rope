export function formatShortDate(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);

  return `${month}.${day}.${year}`;
}
