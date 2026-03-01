"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestFakeStoreProducts = void 0;
const axios_1 = __importDefault(require("axios"));
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const alertChecker_js_1 = require("./alertChecker.js");
//ingest products from Fake Store API
const ingestFakeStoreProducts = async () => {
    try {
        //Set up retailer record for Fake Store API
        const retailer = await prisma_js_1.default.retailer.upsert({
            where: {
                name: "Fake Store API",
            },
            update: {},
            create: {
                name: "Fake Store API",
                apiUrl: "https://fakestoreapi.com",
            },
        });
        //Network request to fetch products
        const response = await axios_1.default.get("https://fakestoreapi.com/products");
        const products = response.data;
        for (const item of products) {
            //create or update the record of the general product info
            const product = await prisma_js_1.default.product.upsert({
                where: {
                    externalId: item.id.toString(),
                },
                update: {
                    title: item.title,
                    imageUrl: item.image,
                    category: item.category,
                },
                create: {
                    externalId: item.id.toString(),
                    title: item.title,
                    imageUrl: item.image,
                    category: item.category,
                },
            });
            //find current listing and check price
            const currentListing = await prisma_js_1.default.productListing.findUnique({
                where: {
                    productId_retailerId: {
                        productId: product.id,
                        retailerId: retailer.id,
                    },
                },
            });
            //update listing and add history only if price changed/listing is new
            const newPrice = item.price;
            const hasPriceChanged = !currentListing || currentListing.currentPrice.toNumber() !== newPrice;
            if (hasPriceChanged) {
                //database upsert for product listing
                await prisma_js_1.default.productListing.upsert({
                    where: {
                        productId_retailerId: {
                            productId: product.id,
                            retailerId: retailer.id,
                        },
                    },
                    update: {
                        currentPrice: newPrice,
                        //add a new point to the price timeline
                        priceHistory: {
                            create: {
                                price: newPrice,
                            },
                        },
                    },
                    create: {
                        productId: product.id,
                        retailerId: retailer.id,
                        currentPrice: newPrice,
                        url: `https://fakestoreapi.com/products/${item.id}`,
                        //add first point in the price timeline
                        priceHistory: {
                            create: { price: newPrice },
                        },
                    },
                });
                //trigger price alert check and notify (after db is upserted)
                await (0, alertChecker_js_1.checkAlerts)(product.id, newPrice);
                console.log(`Updated price: ${item.title} is now ${item.price}`);
            }
        }
        console.log(`Ingestion successful: ${products.length} itmes processed.`);
    }
    catch (error) {
        console.error("Ingestion failed.");
        if (axios_1.default.isAxiosError(error)) {
            console.error("API error:", error.message);
        }
        else {
            console.error("System/database error:", error);
        }
        throw error;
    }
};
exports.ingestFakeStoreProducts = ingestFakeStoreProducts;
/*
01/03 - data ingestion code created to fetch products from Fake Store API
         and alter database records accordingly
*/
//# sourceMappingURL=ingestor.js.map