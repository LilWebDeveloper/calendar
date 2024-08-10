const parseDateString = (dateString) => {
  if (typeof dateString !== "string") {
    return null;
  }

  const [datePart, timePart] = dateString.split(" ");
  if (!datePart || !timePart) {
    return null;
  }

  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
};

export default parseDateString;
