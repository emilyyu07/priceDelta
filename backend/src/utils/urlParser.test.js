"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const urlParser_1 = require("./urlParser");
(0, vitest_1.describe)("parseUrl", () => {
    (0, vitest_1.it)("extracts externalId and normalizes URL", () => {
        const { externalId, cleanUrl } = (0, urlParser_1.parseUrl)("https://www.aritzia.com/en/product/effortless-pant/77775.html?color=navy");
        (0, vitest_1.expect)(externalId).toBe("77775");
        (0, vitest_1.expect)(cleanUrl).toBe("https://www.aritzia.com/en/product/effortless-pant/77775.html");
    });
    (0, vitest_1.it)("throws on invalid URL", () => {
        (0, vitest_1.expect)(() => (0, urlParser_1.parseUrl)("not-a-url")).toThrow("Invalid URL provided");
    });
    (0, vitest_1.it)("throws when no product ID exists in path", () => {
        (0, vitest_1.expect)(() => (0, urlParser_1.parseUrl)("https://www.aritzia.com/en/category/pants")).toThrow("Could not extract Aritzia Product ID from URL");
    });
});
(0, vitest_1.describe)("extractStoreName", () => {
    (0, vitest_1.it)("extracts store name from URL", () => {
        (0, vitest_1.expect)((0, urlParser_1.extractStoreName)("https://www.aritzia.com/product/1")).toBe("Aritzia");
    });
    (0, vitest_1.it)("returns fallback for invalid URL", () => {
        (0, vitest_1.expect)((0, urlParser_1.extractStoreName)("not-a-url")).toBe("Unknown Retailer");
    });
});
//# sourceMappingURL=urlParser.test.js.map