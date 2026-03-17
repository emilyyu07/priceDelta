import "dotenv/config";
import prisma from "./config/prisma.js";
import { initScheduledJobs } from "./config/scheduler.js";
import { createScrapeWorker, scrapeQueue } from "./queue/priceQueue.js";

const { scrapeWorker, monitorInterval } = createScrapeWorker();
initScheduledJobs();
console.log("[Worker] Price scrape worker started.");

const shutdown = async (signal: string) => {
  console.log(`[Worker] Received ${signal}. Starting graceful shutdown...`);
  clearInterval(monitorInterval);
  await scrapeWorker.close();
  await scrapeQueue.close();
  await prisma.$disconnect();
  console.log("[Worker] Shutdown complete.");
  process.exit(0);
};

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

