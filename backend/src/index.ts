import express from "express";
import cors from "cors";
import { initScheduledJobs } from "./config/scheduler.js";
import healthRoutes from "./routes/health.routes.js";
import productRoutes from "./routes/product.routes.js";
import alertRoutes from "./routes/alert.routes.js";
import ingestRoutes from "./routes/ingest.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express(); //initialize express application
const PORT = process.env.PORT || 3001;

// initialize scheduled jobs (start cron job when server starts)
initScheduledJobs();

//global middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/health", healthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/ingest", ingestRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);

//global error handling
app.use(errorHandler);

//log if server is running
app.listen(PORT, () => {
  console.log(`Server successfully running at http://localhost:${PORT}/health`);
});
