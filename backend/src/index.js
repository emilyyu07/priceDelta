"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const scheduler_js_1 = require("./config/scheduler.js");
const health_routes_js_1 = __importDefault(require("./routes/health.routes.js"));
const product_routes_js_1 = __importDefault(require("./routes/product.routes.js"));
const alert_routes_js_1 = __importDefault(require("./routes/alert.routes.js"));
const ingest_routes_js_1 = __importDefault(require("./routes/ingest.routes.js"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const notification_routes_js_1 = __importDefault(require("./routes/notification.routes.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const app = (0, express_1.default)(); //initialize express application
const PORT = process.env.PORT || 3001;
// initialize scheduled jobs (start cron job when server starts)
(0, scheduler_js_1.initScheduledJobs)();
//global middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//routes
app.use("/health", health_routes_js_1.default);
app.use("/api/products", product_routes_js_1.default);
app.use("/api/alerts", alert_routes_js_1.default);
app.use("/api/ingest", ingest_routes_js_1.default);
app.use("/api/auth", auth_routes_js_1.default);
app.use("/api/user", user_routes_js_1.default);
app.use("/api/notifications", notification_routes_js_1.default);
//global error handling
app.use(errorHandler_js_1.errorHandler);
//log if server is running
app.listen(PORT, () => {
    console.log(`Server successfully running at http://localhost:${PORT}/health`);
});
/*
Mini update log
01/04 - finished ingestion cron job
01/07 - register alert routing and email notifications
        added a global error handler (ensures a clean JSON error will be
        sent to frontend/React with upcoming integration)
01/09 - testing endpoints
      --> bug with alert endpoints (some error, might be with nodemailer? figure out tmr), other endpoints successful

01/10 - all endpoints working!, manually triggered ingestion and price drops


Next Steps:
- ensure app.use(cors()) is active for seamless integration with React


Optional Add-in (add in automated testing? with Jest?) --> extra add on later
--> unit test for checkAlerts using Jest

*/
//# sourceMappingURL=index.js.map