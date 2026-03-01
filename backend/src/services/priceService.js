"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveScrapedPrice = saveScrapedPrice;
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
async function saveScrapedPrice(listingId, newPrice) {
    try {
        // Start the transaction
        await prisma_js_1.default.$transaction(async (tx) => {
            // 1. UPDATE the current price on the listing
            await tx.productListing.update({
                where: { id: listingId },
                data: { currentPrice: newPrice },
            });
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
    }
    catch (error) {
        console.error(`Transaction failed! Rolling back changes for listing ${listingId}`, error);
        throw error;
    }
}
//# sourceMappingURL=priceService.js.map