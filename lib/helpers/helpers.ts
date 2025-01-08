import chroma from "chroma-js";

// Define a base color palette and generate variations from it
const baseColor = "#3498db"; // Base color (e.g., blue)
const colorPalette = chroma
  .scale([baseColor, "#e74c3c"]) // Generate colors between blue and red
  .colors(10); // Generate 10 colors for different letters

export function getLetterAndDynamicColor(email: string): {
  letter: string;
  color: string;
} {
  if (!email) {
    return { letter: "", color: "" };
  }

  // Extract the first letter
  const letter = email.charAt(0).toUpperCase();

  // Assign a color based on the first letter
  const charCode = letter.charCodeAt(0);
  const color = colorPalette[charCode % colorPalette.length];

  return { letter, color };
}

// Truncate the file name if it's too long
export const truncateFileName = (name: string, MAX_NAME_LENGTH?: number) => {
  if (!MAX_NAME_LENGTH) {
    MAX_NAME_LENGTH = 13;
  }
  if (name.length > MAX_NAME_LENGTH) {
    const extIndex = name.lastIndexOf(".");
    const extension = extIndex > -1 ? name.slice(extIndex) : "";
    const baseName = name.slice(0, MAX_NAME_LENGTH - extension.length - 3);
    return `${baseName}..${extension}`;
  }
  return name;
};

export function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
