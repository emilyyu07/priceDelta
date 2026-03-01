"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackProduct = void 0;
const priceQueue_1 = require("../queue/priceQueue");
const urlParser_1 = require("../utils/urlParser");
const prisma_1 = __importDefault(require("../config/prisma"));
const trackProduct = async (req, res) => {
    try {
        const { url } = req.body;
        // normalize URL
        const { cleanUrl, externalId } = (0, urlParser_1.parseUrl)(url);
        const storeName = (0, urlParser_1.extractStoreName)(cleanUrl);
        const retailer = await prisma_1.default.retailer.upsert({
            where: { name: storeName },
            update: {},
            create: {
                name: "Aritzia",
                apiUrl: "https://www.aritzia.com",
                isActive: true,
            },
        });
        // create "pending" Listing in PostgreSQL so we have an ID
        const listing = await prisma_1.default.productListing.create({
            data: {
                url: cleanUrl,
                productId: externalId, // assume existing item
                retailerId: retailer.id,
                currentPrice: 0, // Placeholder until the worker finishes
                isActive: false, // Mark as pending
            },
        });
        // push job to queue
        await priceQueue_1.scrapeQueue.add("scrape-aritzia", {
            productUrl: cleanUrl,
            listingId: listing.id,
        });
        //respond to frontend
        res.status(202).json({
            message: "Scrape job added to queue.",
            listingId: listing.id,
            status: "PENDING",
        });
    }
    catch (error) {
        res
            .status(400)
            .json({
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};
exports.trackProduct = trackProduct;
//# sourceMappingURL=product.controller.js.map