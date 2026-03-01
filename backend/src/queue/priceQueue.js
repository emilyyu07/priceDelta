"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeQueue = void 0;
const bullmq_1 = require("bullmq");
const aritziaScraper_1 = require("../workers/scrapers/aritziaScraper");
const priceService_1 = require("../services/priceService");
// establish connection to local Docker Redis
const redisConnectionOptions = {
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
};
// create queue
exports.scrapeQueue = new bullmq_1.Queue("price-scrape-queue", {
    connection: redisConnectionOptions,
});
// create the Worker
// listens to queue and executes this callback whenever a job arrives
const scrapeWorker = new bullmq_1.Worker("price-scrape-queue", async (job) => {
    const { productUrl, listingId } = job.data;
    console.log(`[Worker] Picked up job ${job.id} for listing ${listingId}`);
    // Step A: Run Playwright
    const currentPrice = await (0, aritziaScraper_1.scrapeAritziaPrice)(productUrl);
    // Step B: Save to PostgreSQL safely
    await (0, priceService_1.saveScrapedPrice)(listingId, currentPrice);
    return currentPrice;
}, {
    connection: redisConnectionOptions,
    concurrency: 2, // ensures Playwright only runs 2 browsers at a time (protects RAM)
});
scrapeWorker.on("failed", (job, err) => {
    console.error(`[Worker] Job ${job?.id} failed:`, err.message);
});
//# sourceMappingURL=priceQueue.js.map