"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initScheduledJobs = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const ingestor_js_1 = require("../workers/ingestor.js");
const initScheduledJobs = () => {
    // minute hour day month dayOfWeek
    // */x * * * * -> runs every x minutes
    node_cron_1.default.schedule("*/5 * * * *", async () => {
        const timestamp = new Date().toLocaleString();
        console.log(`Cron Job Started at ${timestamp}: Ingesting products from Fake Store API...`);
        try {
            await (0, ingestor_js_1.ingestFakeStoreProducts)();
            console.log(`Cron Job Completed at ${timestamp}: Ingestion Successful`);
        }
        catch (error) {
            console.error(`Cron Job Failed at ${timestamp}: Ingestion Error`, error);
        }
    });
    console.log("Scheduled Jobs Initialized: set to run every 30 minutes.");
};
exports.initScheduledJobs = initScheduledJobs;
//# sourceMappingURL=scheduler.js.map