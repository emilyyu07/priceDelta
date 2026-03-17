"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScrapeWorker = exports.scrapeQueue = void 0;
require("dotenv/config");
const bullmq_1 = require("bullmq");
const env_js_1 = require("../config/env.js");
const aritziaScraper_1 = require("../workers/scrapers/aritziaScraper");
const price_service_1 = require("../services/price.service");
// establish connection to Redis
const redisConnectionOptions = {
    host: env_js_1.env.REDIS_HOST,
    port: env_js_1.env.REDIS_PORT,
    maxRetriesPerRequest: null,
};
// create queue
exports.scrapeQueue = new bullmq_1.Queue("price-scrape-queue", {
    connection: redisConnectionOptions,
    defaultJobOptions: {
        attempts: 2,
        backoff: {
            type: "exponential",
            delay: 10000,
        },
        removeOnComplete: 100,
        removeOnFail: 100,
    },
});
const createScrapeWorker = () => {
    const scrapeWorker = new bullmq_1.Worker("price-scrape-queue", async (job) => {
        const { productUrl, listingId } = job.data;
        console.log(`[Worker] Picked up job ${job.id} for listing ${listingId}`);
        const scrapeResult = await (0, aritziaScraper_1.scrapeAritziaPrice)(productUrl);
        const newPrice = scrapeResult.price;
        const imageUrl = scrapeResult.imageUrl ?? undefined;
        const title = scrapeResult.title ?? undefined;
        await (0, price_service_1.saveScrapedPrice)(listingId, newPrice, imageUrl, title);
        return scrapeResult;
    }, {
        connection: redisConnectionOptions,
        concurrency: 1,
    });
    scrapeWorker.on("completed", (job) => {
        console.log(`✅ [Worker] Job ${job.id} completed successfully`);
    });
    scrapeWorker.on("failed", (job, err) => {
        console.error(`❌ [Worker] Job ${job?.id} failed:`, err.message);
        if (job?.data) {
            console.error(`Failed URL: ${job.data.productUrl}`);
            console.error(`Listing ID: ${job.data.listingId}`);
        }
    });
    scrapeWorker.on("error", (err) => {
        console.error(`🚨 [Worker] Worker error:`, err);
    });
    const monitorInterval = setInterval(async () => {
        try {
            const waiting = await exports.scrapeQueue.getWaiting();
            const active = await exports.scrapeQueue.getActive();
            const completed = await exports.scrapeQueue.getCompleted();
            const failed = await exports.scrapeQueue.getFailed();
            console.log(`📊 [Queue Status] Waiting: ${waiting.length}, Active: ${active.length}, Completed: ${completed.length}, Failed: ${failed.length}`);
            if (waiting.length > 5) {
                console.warn(`⚠️ [Queue Alert] ${waiting.length} jobs waiting - possible bottleneck`);
            }
        }
        catch (error) {
            console.error(`❌ [Queue Monitoring] Error:`, error);
        }
    }, 10000);
    return { scrapeWorker, monitorInterval };
};
exports.createScrapeWorker = createScrapeWorker;
//# sourceMappingURL=priceQueue.js.map