/**
 * Resilience patterns for asynchronous operations
 */

/**
 * Retries an async function with exponential backoff.
 * @param {Function} fn - The async function to execute.
 * @param {number} maxRetries - Maximum number of attempts.
 * @param {number} delay - Base delay in ms.
 * @returns {Promise<any>}
 */
export const withRetry = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't wait on the last attempt
      if (attempt === maxRetries) break;
      
      const waitTime = delay * Math.pow(2, attempt - 1);
      console.warn(`[Retry] Tentativa ${attempt} falhou. Tentando novamente em ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  throw lastError;
};
