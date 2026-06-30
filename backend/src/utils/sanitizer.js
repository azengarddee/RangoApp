/**
 * Security and Data Sanitization Utilities
 */

/**
 * Sanitizes an array of ingredients to prevent prompt injection and handle noise.
 */
export const sanitizeIngredients = (ingredients) => {
  if (!Array.isArray(ingredients)) return [];
  
  return ingredients
    .map(ing => {
      // Basic string cleaning
      let cleaned = String(ing).trim();
      // Remove common characters used in prompt injection attempts
      cleaned = cleaned.replace(/[#{}[\]]/g, "");
      // Limit length per ingredient
      return cleaned.slice(0, 50);
    })
    .filter(ing => ing.length > 0);
};

/**
 * Sanitizes the recipe type to ensure it's one of the valid enums.
 */
export const sanitizeType = (type) => {
  const validTypes = ["Casa", "Restaurante", "Dieta"];
  return validTypes.includes(type) ? type : "Casa";
};
