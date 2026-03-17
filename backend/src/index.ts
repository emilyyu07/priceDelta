import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import prisma from "./config/prisma.js";
import healthRoutes from "./routes/health.routes";
import productRoutes from "./routes/product.routes";
import alertRoutes from "./routes/alert.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import notificationRoutes from "./routes/notification.routes";
import notificationStreamRoutes from "./routes/notification-stream.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express(); //initialize express application
const PORT = env.PORT;

//global middleware
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

//routes
app.use("/health", healthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/notifications/stream", notificationStreamRoutes);

//global error handling
app.use(errorHandler);

//log if server is running
const server = app.listen(PORT, () => {
  console.log(`Server successfully running at http://localhost:${PORT}/health`);
});

const shutdown = (signal: string) => {
  console.log(`[API] Received ${signal}. Starting graceful shutdown...`);
  server.close(async () => {
    await prisma.$disconnect();
    console.log("[API] Shutdown complete.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
