import * as recipeController from "../controllers/recipeController.js";

/**
 * Recipe module routes
 */
export default async function recipeRoutes(fastify, options) {
  fastify.post("/generate", {
    config: {
      timeout: 30000 // 30 segundos de timeout para esta rota específica
    }
  }, recipeController.getRecipeSuggestion);
}
