import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import dotenv from "dotenv";
import recipeRoutes from "./src/routes/recipeRoutes.js";

dotenv.config();

const server = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

// Security middlewares
await server.register(helmet);
await server.register(cors, {
  origin: true, // Em desenvolvimento pode ser true, em produção deve ser o domínio do frontend
});

// Graceful timeout configuration
server.addHook("onRequest", async (request, reply) => {
  // Configura um timeout global de 40 segundos
  reply.raw.setTimeout(40000);
});

// App Routes
await server.register(recipeRoutes, { prefix: "/api/recipes" });

// Health check
server.get("/health", async () => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

/**
 * Start the server
 */
const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await server.listen({ port, host: "0.0.0.0" });
    server.log.info(`Backend RangoApp rodando em http://172.21.28.176:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
