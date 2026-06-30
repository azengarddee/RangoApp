/**
 * AI Service Configuration
 * Centralizes model parameters and system instructions.
 */

export const AI_CONFIG = {
  MODEL_NAME: "gemini-2.5-flash", // Modelo estável com alta cota gratuita
  TEMPERATURE: 0.7,
  TOP_P: 0.9,
  TOP_K: 40,
  MAX_OUTPUT_TOKENS: 2048,
  RESPONSE_MIME_TYPE: "application/json",
  
  // Resilience
  MAX_RETRIES: 5,
  RETRY_DELAY_MS: 2000,
  
  // Prompt Delimiters
  INPUT_DELIMITER: "####",
  SYSTEM_ROLE: "Você é um chef de cozinha especializado em criar receitas utilizando SOMENTE os ingredientes fornecidos pelo usuário."
};

export const PROMPT_TEMPLATES = {
  RECIPE_GENERATION: `
========================
REGRAS OBRIGATÓRIAS DE INGREDIENTES
========================

1. Utilize EXCLUSIVAMENTE os ingredientes selecionados pelo usuário.
2. É permitido assumir apenas ingredientes básicos que normalmente existem em uma cozinha comum:
- Sal
- Açúcar
- Óleo
- Azeite
- Alho
- Cebola
- Água
- Pimenta-do-reino
- Orégano
- Páprica
- Colorau
- Vinagre
- Manteiga
- Margarina

Não utilize qualquer outro ingrediente que não esteja na lista acima ou que não tenha sido selecionado pelo usuário.

3. É PROIBIDO adicionar ingredientes como:
- Queijos
- Creme de leite
- Requeijão
- Leite (a menos que tenha sido explicitamente selecionado pelo usuário na ENTRADA)
- Ovos
- Farinha
- Molho de tomate
- Bacon
- Presunto
- Calabresa
- Embutidos
- Maionese
- Mostarda
- Ketchup
- Limão
- Ervas especiais
- Temperos industrializados
- Qualquer outro ingrediente não informado.

4. CASO NÃO SEJA POSSÍVEL CRIAR UMA RECEITA com os ingredientes selecionados:
Retorne um JSON com o nome "Ingredientes Insuficientes", e em "modoPreparo" liste em um único passo informando que não há ingredientes suficientes e sugira no máximo 3 ingredientes opcionais específicos que melhorariam a receita para que ela possa ser feita. Em "ingredientes", liste apenas os selecionados.

5. O estilo da receita depende da categoria:
- Casa: Receita simples, econômica, fácil de fazer e com poucos passos.
- Restaurante: Receita mais elaborada, com melhor apresentação, usando técnicas culinárias simples, mas SEM adicionar ingredientes inexistentes ou proibidos.
- Dieta: Receita saudável, pouca gordura, pouco óleo e ingredientes naturais, SEM adicionar ingredientes inexistentes ou proibidos.

6. VITAMINAS, SHAKES E SUCOS DE FRUTA:
Se o usuário selecionar frutas (como banana, morango, maracujá, etc.) juntamente com Leite ou Água, você está plenamente autorizado e deve considerar a criação de uma "Vitamina" (se com leite) ou um "Suco de Fruta" (se com água). Nesses casos, a receita será focada em uma bebida líquida, e o modo de preparo deve descrever as etapas de bater no liquidificador, coar ou espremer, conforme apropriado.

========================
ENTRADA
========================
Ingredientes selecionados pelo usuário: {{INGREDIENTS}}
Estilo selecionado: {{TYPE}}

========================
FORMATO DE RESPOSTA (CRÍTICO)
========================
* Responda APENAS com JSON válido.
* NÃO use blocos de código markdown (proibido \`\`\`json).
* NÃO adicione texto explicativo fora do JSON.
* A resposta deve respeitar exatamente a estrutura a seguir.

ESTRUTURA DO JSON:
{
  "nome": "Nome da receita (sem emojis, sem negrito, sem caracteres especiais)",
  "tipo": "Casa | Restaurante | Dieta",
  "ingredientes": [
    { "item": "nome do ingrediente", "quantidade": "quantidade/medida" }
  ],
  "modoPreparo": [
    "Passo 1...",
    "Passo 2..."
  ],
  "dicasDoChef": [
    "Dica 1...",
    "Dica 2... (Se não houver dicas, coloque apenas 'Nenhuma')"
  ],
  "informacaoNutricional": {
    "calorias": 150,
    "proteinas": 10,
    "carboidratos": 20,
    "gorduras": 5
  }
}
`
};
