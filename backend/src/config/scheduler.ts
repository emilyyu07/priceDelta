import cron from "node-cron";
import prisma from "./prisma.js";
import { scrapeQueue } from "../queue/priceQueue.js";

export const initScheduledJobs = () => {
  // minute hour day month day-of-week
  console.log("Scheduled Jobs Initialized: Pulse engine active.");

  // runs at 3am daily 0 3 * * *
  // with daily minute
  cron.schedule("0 3 * * *", async () => {
    console.log("[CRON] Waking up to check all tracked prices...");
    try {
      //find all active/tracked product listings
      const activeListings = await prisma.productListing.findMany({
        where: { isActive: true },
        select: { id: true, url: true },
      });

      console.log(
        `[CRON] Found ${activeListings.length} active listings to check.`,
      );

      // push to redis Queue
      let queuedCount = 0;
      for (const listing of activeListings) {
        if (listing.url) {
          await scrapeQueue.add("daily-scrape", {
            productUrl: listing.url,
            listingId: listing.id,
          });
          queuedCount++;
        }
      }

      console.log(`[CRON] Successfully queued ${queuedCount} scrape jobs.`);
    } catch (error) {
      console.error("[CRON] Critical failure during daily schedule:", error);
    }
  });
};
