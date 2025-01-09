/* eslint-disable @typescript-eslint/no-explicit-any */

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

export function formatDate(inputDate: string): string {
  // Try to parse the input date using the built-in Date object
  const parsedDate = new Date(inputDate);

  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format");
  }

  // Format the date as YYYY-MM-DD
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

type SortOrder = "asc" | "desc";

export function sortArray<T extends Record<string, any>>(
  array: T[],
  key: keyof T,
  order: SortOrder = "asc"
): T[] {
  return array?.sort((a, b) => {
    if (!a[key] || !b[key]) return 0;

    const isDate = !isNaN(Date.parse(a[key])) && !isNaN(Date.parse(b[key]));
    const valueA = isDate
      ? new Date(a[key]).getTime()
      : a[key].toString().toLowerCase();
    const valueB = isDate
      ? new Date(b[key]).getTime()
      : b[key].toString().toLowerCase();

    if (valueA < valueB) return order === "asc" ? -1 : 1;
    if (valueA > valueB) return order === "asc" ? 1 : -1;
    return 0;
  });
}

export function formatDateString(dateString: string): string {
  const date = new Date(dateString);

  // Extract day, month, and year
  const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if necessary
  const month = date.toLocaleString("default", { month: "short" }); // Get short month name
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}
