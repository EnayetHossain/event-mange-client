export const FormatDate = (isoDate) => {
  const date = new Date(isoDate);

  const options = { day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
};
