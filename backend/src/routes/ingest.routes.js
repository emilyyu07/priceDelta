"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingestor_js_1 = require("../workers/ingestor.js");
const router = (0, express_1.Router)();
//manual ingestion trigger
router.get("/", async (_req, res, next) => {
    try {
        await (0, ingestor_js_1.ingestFakeStoreProducts)();
        res.status(200).json({ message: "Ingestion completed successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=ingest.routes.js.map