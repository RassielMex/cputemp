//returns a string in format "yyyy-mm-ddT:hh-mm"
export const stringDateFormatter = (date) => {
  let str = "";
  if (date instanceof Date) {
    const yearStr = date.getFullYear().toString();
    const monthStr = dateZeroFormatter(date.getMonth() + 1).toString();
    const dayStr = dateZeroFormatter(date.getDate());
    const hourStr = dateZeroFormatter(date.getHours());
    const minuteStr = dateZeroFormatter(date.getMinutes());
    str = `${yearStr}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}`;
  }

  return str;
};

//Adds "0" as string before value if < 10
const dateZeroFormatter = (date) => {
  let dateFormatted = "";
  if (typeof date === "number") {
    dateFormatted = date >= 10 ? date.toString() : "0" + date.toString();
  }
  return dateFormatted;
};
