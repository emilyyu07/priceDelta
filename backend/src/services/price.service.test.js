"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const price_service_1 = require("./price.service");
const alertChecker_js_1 = require("../workers/alertChecker.js");
vitest_1.vi.mock("../config/prisma.js", () => ({
    default: {
        $transaction: vitest_1.vi.fn(),
    },
}));
vitest_1.vi.mock("../workers/alertChecker.js", () => ({
    checkAlertsForProduct: vitest_1.vi.fn(),
}));
(0, vitest_1.describe)("saveScrapedPrice", () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)("writes listing/history and triggers alert checks", async () => {
        const tx = {
            productListing: {
                update: vitest_1.vi.fn().mockResolvedValue({ productId: "product-1" }),
            },
            product: {
                update: vitest_1.vi.fn().mockResolvedValue({}),
            },
            priceHistory: {
                create: vitest_1.vi.fn().mockResolvedValue({}),
            },
        };
        vitest_1.vi.mocked(prisma_js_1.default.$transaction).mockImplementation(async (cb) => cb(tx));
        await (0, price_service_1.saveScrapedPrice)("listing-1", 99.99, "https://img.example/item.jpg", "Item Title");
        (0, vitest_1.expect)(prisma_js_1.default.$transaction).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(tx.productListing.update).toHaveBeenCalledWith(vitest_1.expect.objectContaining({ where: { id: "listing-1" } }));
        (0, vitest_1.expect)(tx.priceHistory.create).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            data: vitest_1.expect.objectContaining({ listingId: "listing-1", price: 99.99 }),
        }));
        (0, vitest_1.expect)(alertChecker_js_1.checkAlertsForProduct).toHaveBeenCalledWith("product-1", 99.99);
    });
    (0, vitest_1.it)("throws when transaction fails", async () => {
        vitest_1.vi.mocked(prisma_js_1.default.$transaction).mockRejectedValue(new Error("tx failed"));
        await (0, vitest_1.expect)((0, price_service_1.saveScrapedPrice)("listing-1", 50)).rejects.toThrow("tx failed");
        (0, vitest_1.expect)(alertChecker_js_1.checkAlertsForProduct).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=price.service.test.js.map