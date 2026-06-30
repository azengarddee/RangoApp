import { recipeService } from "../services/geminiService.js";
import { requestRecipeSchema } from "../schemas/recipeSchema.js";
import { sanitizeIngredients } from "../utils/sanitizer.js";

/**
 * Controller to handle recipe generation requests
 */
export const getRecipeSuggestion = async (request, reply) => {
  try {
    // 1. Validate Input Structure (Zod)
    const validation = requestRecipeSchema.safeParse(request.body);
    
    if (!validation.success) {
      return reply.status(400).send({
        status: "error",
        message: "Dados de entrada inválidos.",
        errors: validation.error.format()
      });
    }

    const { ingredients, type } = validation.data;

    // 2. Sanitize Inputs (Security Layer)
    const cleanIngredients = sanitizeIngredients(ingredients);

    // 3. Call AI Service (Resilience Layer happens inside)
    const aiResponse = await recipeService.generateRecipe(cleanIngredients, type);

    // 4. Return Standardized Success Response
    return reply.status(200).send({
      status: "success",
      data: aiResponse
    });

  } catch (error) {
    request.log.error(`[Controller Error]: ${error.message}`);
    
    // Choose status code based on error type if needed
    const statusCode = error.message.includes("IA") ? 502 : 500;

    return reply.status(statusCode).send({
      status: "error",
      message: error.message || "Ocorreu um erro interno ao processar sua receita."
    });
  }
};

