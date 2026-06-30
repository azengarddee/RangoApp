import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_CONFIG, PROMPT_TEMPLATES } from "../config/aiConfig.js";
import { withRetry } from "../utils/retry.js";
import { tryParseJSON, validateIngredientCoverage } from "../utils/jsonFallback.js";
import { aiResponseSchema } from "../schemas/recipeSchema.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * PRODUCTION-GRADE RECIPE SERVICE
 * Handles communication with Gemini AI, resilience, and data validation.
 */
class RecipeService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY não configurada no ambiente.");
    }
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ 
      model: AI_CONFIG.MODEL_NAME,
      generationConfig: {
        responseMimeType: AI_CONFIG.RESPONSE_MIME_TYPE,
        temperature: AI_CONFIG.TEMPERATURE,
        topP: AI_CONFIG.TOP_P,
      },
    });
  }

  /**
   * Generates a recipe with mandatory resilience and validation layers.
   */
  async generateRecipe(ingredients, type = "Casa") {
    return await withRetry(
      () => this._executeGeneration(ingredients, type),
      AI_CONFIG.MAX_RETRIES,
      AI_CONFIG.RETRY_DELAY_MS
    );
  }

  /**
   * Internal execution logic with fallback and schema validation.
   */
  async _executeGeneration(ingredients, type) {
    const prompt = this._buildPrompt(ingredients, type);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // 1. JSON Parsing with Fallback
      const rawData = tryParseJSON(text);
      if (!rawData) {
        throw new Error("Falha ao processar JSON retornado pela IA.");
      }

      // 2. Schema Validation (Zod)
      const validatedData = aiResponseSchema.safeParse(rawData);
      if (!validatedData.success) {
        console.warn("[Schema Validation Failed]", validatedData.error.format());
        throw new Error("Resposta da IA não segue o contrato de dados esperado.");
      }

      // 3. Business Logic Validation: Ingredient Coverage
      const hasFullCoverage = validateIngredientCoverage(ingredients, validatedData.data);
      if (!hasFullCoverage) {
        console.warn("[Ingredient Coverage Failure] A IA ignorou alguns ingredientes.");
        // We throw here to trigger a retry if coverage is incomplete
        throw new Error("A receita gerada não utilizou todos os ingredientes obrigatórios.");
      }

      return validatedData.data;

    } catch (error) {
      console.error(`[RecipeService Error]: ${error.message}`);
      throw error;
    }
  }

  /**
   * Builds a structured prompt using constants.
   */
  _buildPrompt(ingredients, type) {
    let promptTemplate = PROMPT_TEMPLATES.RECIPE_GENERATION;
    
    // Injetando as variáveis no template fornecido
    promptTemplate = promptTemplate.replace("{{INGREDIENTS}}", ingredients.join(", "));
    promptTemplate = promptTemplate.replace("{{TYPE}}", type);
    
    return `
      ${AI_CONFIG.SYSTEM_ROLE}
      
      ${promptTemplate}
    `;
  }
}

export const recipeService = new RecipeService();
