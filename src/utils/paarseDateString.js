const parseDateString = (dateString) => {
  if (typeof dateString !== "string") {
    console.error("Invalid date string:", dateString);
    return null;
  }

  const [datePart, timePart] = dateString.split(" ");
  if (!datePart || !timePart) {
    console.error("Date string does not match expected format:", dateString);
    return null;
  }

  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
};

export default parseDateString;
