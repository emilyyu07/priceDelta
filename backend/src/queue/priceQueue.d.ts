import "dotenv/config";
import { Queue, Worker } from "bullmq";
export declare const scrapeQueue: Queue<any, any, string, any, any, string>;
export declare const createScrapeWorker: () => {
    scrapeWorker: Worker<any, any, string>;
    monitorInterval: NodeJS.Timeout;
};
//# sourceMappingURL=priceQueue.d.ts.map