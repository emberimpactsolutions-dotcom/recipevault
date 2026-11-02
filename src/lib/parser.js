export function parseRecipe(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const recipeName = lines
    .slice(0, 3)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  let ingredients = [];
  let directions = [];

  let currentSection = null;

  for (const line of lines) {
    const lower = line.toLowerCase();

    // Detect ingredients section
    if (
      lower.includes("ingredient")
    ) {
      currentSection = "ingredients";
      continue;
    }

    // Detect directions section
    if (
      lower.includes("direction") ||
      lower.includes("method") ||
      lower.includes("instruction")
    ) {
      currentSection = "directions";
      continue;
    }

    if (currentSection === "ingredients") {
      ingredients.push(line);
    }

    if (currentSection === "directions") {
      directions.push(line);
    }
  }

  // Better category detection

  const title = recipeName.toLowerCase();

  let category = "Other";

  if (
    title.includes("cookie") ||
    title.includes("cake") ||
    title.includes("brownie") ||
    title.includes("dessert")
  ) {
    category = "Dessert";
  }

  if (
    title.includes("lasagne") ||
    title.includes("stew") ||
    title.includes("curry") ||
    title.includes("pasta")
  ) {
    category = "Dinner";
  }

  return {
    recipeName,
    category,
    ingredients,
    directions,
    rawText: text,
  };
}