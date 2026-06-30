/**
 * Deep JSON parsing and recovery utilities
 */

/**
 * Attempts to extract and parse JSON from a string that might contain extra text or markdown.
 * @param {string} rawString 
 * @returns {object|null}
 */
export const tryParseJSON = (rawString) => {
  if (!rawString) return null;

  try {
    // 1. Direct parse
    return JSON.parse(rawString.trim());
  } catch (e) {
    try {
      // 2. Extract JSON from markdown blocks (```json ... ```)
      const jsonMatch = rawString.match(/```json\n([\s\S]*?)\n```/) || 
                        rawString.match(/{[\s\S]*}/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0].trim());
      }
    } catch (innerError) {
      console.error("[JSON Fallback] Falha crítica ao tentar recuperar JSON da resposta da IA.");
    }
  }
  
  return null;
};

/**
 * Checks if all required ingredients are present in the AI response.
 * @param {string[]} providedIngredients 
 * @param {object} recipeData 
 * @returns {boolean}
 */
export const validateIngredientCoverage = (providedIngredients, recipeData) => {
  // Se não foi possível criar a receita por falta de ingredientes, pula a validação de cobertura
  if (recipeData.nome === "Ingredientes Insuficientes") return true;

  if (!recipeData.ingredientes || !Array.isArray(recipeData.ingredientes)) return false;
  
  const recipeItemsText = recipeData.ingredientes
    .map(i => (i.item || "").toLowerCase())
    .join(" ");
    
  // Check if every provided ingredient appears at least as a substring in the recipe ingredients
  return providedIngredients.every(ing => 
    recipeItemsText.includes(ing.toLowerCase())
  );
};
