/**
 * RANGO APP - AI SERVICE (REFACTORED)
 * 
 * Agora este serviço consome o nosso backend Fastify próprio.
 * Vantagens:
 * 1. API KEY protegida no servidor
 * 2. Validação robusta com Zod no backend
 * 3. Prompt Engineering centralizado
 */

/**
 * NOTA DE CONECTIVIDADE:
 * Se você estiver testando em um CELULAR REAL via Expo:
 * 1. Descubra o IP do seu computador (ex: 192.168.x.x)
 * 2. Substitua 'localhost' pelo seu IP abaixo.
 * Exemplo: const API_BASE_URL = "http://192.168.1.10:3000/api/recipes";
 */
const API_BASE_URL = "http://172.21.28.176:3000/api/recipes";

export const buscarSugestaoIA = async (ingredientesSelecionados, type = "Casa") => {
  if (ingredientesSelecionados.length === 0) {
    throw new Error("Selecione pelo menos um ingrediente.");
  }

  try {
    // Implementação de AbortController para timeout no frontend (boa prática Sênior)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        ingredients: ingredientesSelecionados,
        type: type
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const result = await response.json();

    if (!response.ok) {
      // Erro estruturado vindo do nosso backend
      console.error("Erro no Backend:", result);
      throw new Error(result.message || "Erro ao conectar com o servidor.");
    }

    // Retorna os dados da receita (JSON já validado pelo backend)
    return result.data;

  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error("A requisição demorou demais. Verifique sua conexão.");
    }
    console.error("Erro detalhado no aiService:", error);
    throw error;
  }
};
