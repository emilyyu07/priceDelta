import "dotenv/config";
import { Queue, Worker, Job } from "bullmq";
import { scrapeAritziaPrice } from "../workers/scrapers/aritziaScraper";
import { saveScrapedPrice } from "../services/price.service";

const redisPort = Number(process.env.REDIS_PORT || "6379");

if (Number.isNaN(redisPort)) {
  throw new Error("REDIS_PORT must be a valid number.");
}

// establish connection to Redis
const redisConnectionOptions = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: redisPort,
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

    //run Playwright
    const scrapeResult = await scrapeAritziaPrice(productUrl);

    const newPrice = scrapeResult.price;
    const imageUrl = scrapeResult.imageUrl ?? undefined;
    const title = scrapeResult.title ?? undefined;

    //save to PostgreSQL
    await saveScrapedPrice(listingId, newPrice, imageUrl, title);

    return scrapeResult;
  },
  {
    connection: redisConnectionOptions,
    concurrency: 1, // Reduced to 1 to avoid anti-scraping detection
  },
);

// Add comprehensive logging and monitoring
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

// Add queue monitoring
setInterval(async () => {
  try {
    const waiting = await scrapeQueue.getWaiting();
    const active = await scrapeQueue.getActive();
    const completed = await scrapeQueue.getCompleted();
    const failed = await scrapeQueue.getFailed();

    console.log(
      `📊 [Queue Status] Waiting: ${waiting.length}, Active: ${active.length}, Completed: ${completed.length}, Failed: ${failed.length}`,
    );

    // Alert if queue is backing up
    if (waiting.length > 5) {
      console.warn(
        `⚠️ [Queue Alert] ${waiting.length} jobs waiting - possible bottleneck`,
      );
    }
  } catch (error) {
    console.error(`❌ [Queue Monitoring] Error:`, error);
  }
}, 10000); // Every 10 seconds

scrapeWorker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed:`, err.message);
});
