import cron from "node-cron";

export const initScheduledJobs = () => {
  // minute hour day month dayOfWeek
  // */x * * * * -> runs every x minutes

  console.log("Scheduled Jobs Initialized: waiting for future cron jobs");

  // Future Job: Daily Price Updater
  // cron.schedule('0 3 * * *', async () => {
  //   console.log('Waking up to check all Aritzia prices...');
  //   // Logic to fetch all active ProductListings and push to Redis
  // });
};
