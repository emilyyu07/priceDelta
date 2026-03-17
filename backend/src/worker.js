"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const prisma_js_1 = __importDefault(require("./config/prisma.js"));
const scheduler_js_1 = require("./config/scheduler.js");
const priceQueue_js_1 = require("./queue/priceQueue.js");
const { scrapeWorker, monitorInterval } = (0, priceQueue_js_1.createScrapeWorker)();
(0, scheduler_js_1.initScheduledJobs)();
console.log("[Worker] Price scrape worker started.");
const shutdown = async (signal) => {
    console.log(`[Worker] Received ${signal}. Starting graceful shutdown...`);
    clearInterval(monitorInterval);
    await scrapeWorker.close();
    await priceQueue_js_1.scrapeQueue.close();
    await prisma_js_1.default.$disconnect();
    console.log("[Worker] Shutdown complete.");
    process.exit(0);
};
process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
});
process.on("SIGINT", () => {
    void shutdown("SIGINT");
});
//# sourceMappingURL=worker.js.map