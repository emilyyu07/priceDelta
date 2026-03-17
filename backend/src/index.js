"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_js_1 = require("./config/env.js");
const scheduler_1 = require("./config/scheduler");
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const alert_routes_1 = __importDefault(require("./routes/alert.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const notification_stream_routes_1 = __importDefault(require("./routes/notification-stream.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)(); //initialize express application
const PORT = env_js_1.env.PORT;
// initialize scheduled jobs (start cron job when server starts)
(0, scheduler_1.initScheduledJobs)();
//global middleware
app.use((0, cors_1.default)({
    origin: env_js_1.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json());
//routes
app.use("/health", health_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use("/api/alerts", alert_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api/notifications", notification_routes_1.default);
app.use("/api/notifications/stream", notification_stream_routes_1.default);
//global error handling
app.use(errorHandler_1.errorHandler);
//log if server is running
app.listen(PORT, () => {
    console.log(`Server successfully running at http://localhost:${PORT}/health`);
});
//# sourceMappingURL=index.js.map