"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveScrapedPrice = saveScrapedPrice;
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const alertChecker_js_1 = require("../workers/alertChecker.js");
async function saveScrapedPrice(listingId, newPrice, imageUrl, title) {
    try {
        let productId = "";
        // Start the transaction
        await prisma_js_1.default.$transaction(async (tx) => {
            // 1. UPDATE the current price on the listing
            const updatedListing = await tx.productListing.update({
                where: { id: listingId },
                data: { currentPrice: newPrice, isActive: true },
                include: { product: true },
            });
            productId = updatedListing.productId;
            if (imageUrl) {
                await tx.product.update({
                    where: { id: updatedListing.productId },
                    data: { imageUrl: imageUrl },
                });
            }
            if (title) {
                await tx.product.update({
                    where: { id: updatedListing.productId },
                    data: { title: title },
                });
            }
            // 2. INSERT the new datapoint into the history graph
            await tx.priceHistory.create({
                data: {
                    listingId: listingId,
                    price: newPrice,
                    // currency defaults to "USD" or "CAD" based on your schema
                    // timestamp defaults to now()
                },
            });
        });
        console.log(`Successfully saved new price: $${newPrice} for listing ${listingId}`);
        // 3. TRIGGER ALERT CHECKS (outside transaction for performance)
        if (productId) {
            console.log(`[Alert Engine] Checking alerts for product ${productId} at $${newPrice}`);
            await (0, alertChecker_js_1.checkAlertsForProduct)(productId, newPrice);
        }
    }
    catch (error) {
        console.error(`Transaction failed! Rolling back changes for listing ${listingId}`, error);
        throw error;
    }
}
//# sourceMappingURL=price.service.js.map