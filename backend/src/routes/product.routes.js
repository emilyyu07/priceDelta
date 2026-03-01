"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_js_1 = require("../controllers/product.controller.js");
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const router = (0, express_1.Router)();
router.post("/track", product_controller_js_1.trackProduct);
// get all products (browsing page)
router.get("/", async (_req, res, next) => {
    try {
        const products = await prisma_js_1.default.product.findMany({
            include: {
                listings: {
                    select: {
                        currentPrice: true,
                        retailer: {
                            select: {
                                name: true,
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
            include: {
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
exports.default = router;
//# sourceMappingURL=product.routes.js.map