export function getFormattedDate() {
  const today = new Date();

  // Define arrays for day and month names
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract day, date, month, and year
  const day = days[today.getDay()]; // Day name (e.g., Tues)
  const date = today.getDate(); // Day of the month (e.g., 26)
  const month = months[today.getMonth()]; // Month name (e.g., November)
  const year = today.getFullYear(); // Year (e.g., 2024)

  // Format the date
  return `${day}, ${date} ${month} ${year}`;
}

export function formatTimeIntl(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric", // Include minutes in the output
    hour12: true, // Ensure 12-hour format
  })
    .format(date)
    .replace(" ", "") // Remove space between time and period
    .toLowerCase(); // Convert AM/PM to lowercase
}

export function getGreeting(): string {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}
