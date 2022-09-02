export const labelsFromTime = (data) => {
  return data.map((d) => {
    return `${d.time.hour}:${d.time.minute < 10 ? "0" : ""}${d.time.minute}hrs`;
  });
};
