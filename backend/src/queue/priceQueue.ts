import { Queue, Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { scrapeAritziaPrice } from "../workers/scrapers/aritziaScraper";
import { saveScrapedPrice } from "../services/priceService";

// establish connection to local Docker Redis
const redisConnectionOptions = {
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
};

// create queue
export const scrapeQueue = new Queue("price-scrape-queue", {
  connection: redisConnectionOptions,
});

// create the Worker
// listens to queue and executes this callback whenever a job arrives
const scrapeWorker = new Worker(
  "price-scrape-queue",
  async (job: Job) => {
    const { productUrl, listingId } = job.data;

    console.log(`[Worker] Picked up job ${job.id} for listing ${listingId}`);

    // Step A: Run Playwright
    const currentPrice = await scrapeAritziaPrice(productUrl);

    // Step B: Save to PostgreSQL safely
    await saveScrapedPrice(listingId, currentPrice);

    return currentPrice;
  },
  {
    connection: redisConnectionOptions,
    concurrency: 2, // ensures Playwright only runs 2 browsers at a time (protects RAM)
  },
);

scrapeWorker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed:`, err.message);
});
