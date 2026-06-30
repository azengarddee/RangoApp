import { z } from "zod";

/**
 * Validates the input from the frontend.
 */
export const requestRecipeSchema = z.object({
  ingredients: z.array(z.string())
    .min(1, "Selecione pelo menos um ingrediente.")
    .max(30, "Limite de ingredientes excedido (max 30)."),
  type: z.enum(["Casa", "Restaurante", "Dieta"]).default("Casa"),
});

/**
 * Internal schema to validate the RAW response from the AI.
 */
export const aiResponseSchema = z.object({
  nome: z.string().min(3, "Nome da receita curto demais."),
  tipo: z.string(),
  ingredientes: z.array(z.object({
    item: z.string(),
    quantidade: z.string(),
  })).min(1),
  modoPreparo: z.array(z.string()).min(2),
  informacaoNutricional: z.object({
    calorias: z.union([z.string(), z.number()]),
    proteinas: z.union([z.string(), z.number()]),
    carboidratos: z.union([z.string(), z.number()]),
    gorduras: z.union([z.string(), z.number()]),
  }),
});

/**
 * Standard API response schema.
 */
export const apiResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  message: z.string().optional(),
  data: aiResponseSchema.optional(),
  errors: z.any().optional(),
});

