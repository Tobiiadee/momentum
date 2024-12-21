import { tasks } from "@/modules/assets/DUMMY_TASK";
import { list } from "@/modules/assets/list";
import chroma from 'chroma-js';

// Calculate task counts dynamically
export const updatedList = list.map((list) => {
  let taskCount = 0;

  if (list.label === "home") {
    taskCount = tasks.length; // Total tasks
  } else if (list.label === "completed") {
    taskCount = tasks.filter((task) => task.completed).length;
  } else if (list.label === "personal") {
    taskCount = tasks.filter(
      (task) => task.category.label === "personal"
    ).length;
  } else if (list.label === "work") {
    taskCount = tasks.filter((task) => task.category.label === "work").length;
  }

  return { ...list, numberOfTask: taskCount }; // Update numberOfTask
});

// Define a color palette for mapping
// const colorPalette = [
//   "#FF5733", // Red
//   "#33FF57", // Green
//   "#3357FF", // Blue
//   "#FF33A1", // Pink
//   "#FFC300", // Yellow
//   "#6A33FF", // Purple
//   "#33FFF5", // Teal
// ];



// Define a base color palette and generate variations from it
const baseColor = '#3498db'; // Base color (e.g., blue)
const colorPalette = chroma.scale([baseColor, '#e74c3c']) // Generate colors between blue and red
  .colors(10); // Generate 10 colors for different letters

export function getLetterAndDynamicColor(email: string): { letter: string; color: string } {
  if (!email) {
    return { letter: '', color: '' };
  }

  // Extract the first letter
  const letter = email.charAt(0).toUpperCase();

  // Assign a color based on the first letter
  const charCode = letter.charCodeAt(0);
  const color = colorPalette[charCode % colorPalette.length];

  return { letter, color };
}

