"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const router = (0, express_1.Router)();
router.post("/track", product_controller_1.trackProduct);
// polling
router.get("/track/:listingId/status", product_controller_1.getTrackStatus);
// get all products (browsing page)
router.get("/", async (_req, res, next) => {
    try {
        const products = await prisma_js_1.default.product.findMany({
            where: {
                listings: {
                    some: {
                        isActive: true,
                    },
                },
            },
            select: {
                id: true,
                externalId: true,
                title: true,
                description: true,
                category: true,
                imageUrl: true,
                url: true,
                createdAt: true,
                updatedAt: true,
                listings: {
                    select: {
                        id: true,
                        productId: true,
                        retailerId: true,
                        currentPrice: true,
                        url: true,
                        isActive: true,
                        retailer: {
                            select: {
                                id: true,
                                name: true,
                                apiUrl: true,
                                isActive: true,
                            },
                        },
                    },
                },
            },
        });
        res.json(products);
    }
    catch (error) {
        next(error);
    }
});
//get a single product with price history (chart page)
router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await prisma_js_1.default.product.findUnique({
            where: { id },
            select: {
                id: true,
                externalId: true,
                title: true,
                description: true,
                category: true,
                imageUrl: true,
                url: true,
                createdAt: true,
                updatedAt: true,
                listings: {
                    include: {
                        retailer: true,
                        priceHistory: {
                            orderBy: {
                                timestamp: "asc",
                            },
                        },
                    },
                },
            },
        });
        //check if product exists, return error if not
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        //if valid, return product data
        res.json(product);
    }
    catch (error) {
        next(error);
    }
});
// Debugging and monitoring endpoints
router.get("/health", auth_middleware_js_1.protect, product_controller_1.getQueueHealth);
router.post("/clear-stuck-jobs", auth_middleware_js_1.protect, product_controller_1.clearStuckJobs);
exports.default = router;
//# sourceMappingURL=product.routes.js.map