"use strict";
// web Scraper for Aritzia
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeAritziaPrice = scrapeAritziaPrice;
const playwright_1 = require("playwright");
// keep a single global browser instance alive in memory
let globalBrowser = null;
async function scrapeAritziaPrice(productUrl) {
    // initialize the browser only if it doesn't exist yet
    if (!globalBrowser) {
        globalBrowser = await playwright_1.chromium.launch({
            headless: true, // still run headless on the server
            args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for Linux servers/Docker
        });
    }
    let context = null;
    try {
        // cCreate a fresh, isolated context
        // spoof the User-Agent (so we do not appear as headless)
        context = await globalBrowser.newContext({
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            viewport: { width: 1920, height: 1080 }, // pretend to be a desktop
            deviceScaleFactor: 1,
            hasTouch: false,
        });
        // open a new tab
        const page = await context.newPage();
        // navigate to the Aritzia product URL
        await page.goto(productUrl, {
            waitUntil: "domcontentloaded",
            timeout: 30000,
        });
        // DOM Extraction
        await page
            .waitForSelector(".product-detail", { timeout: 10000 })
            .catch(() => null);
        let rawPriceText = "";
        // always check for the SALE price first
        const saleLocator = page.locator("#product-list-sale-text");
        if ((await saleLocator.count()) > 0) {
            // The product is on sale!
            rawPriceText = await saleLocator.first().innerText();
        }
        else {
            // if not, check for the REGULAR price
            const regularLocator = page.locator("#product-list-price-text");
            if ((await regularLocator.count()) > 0) {
                rawPriceText = await regularLocator.first().innerText();
            }
            else {
                // fallback: DOM changed, we cannot locate price
                throw new Error("DOM Parse Error: Could not find sale or regular price.");
            }
        }
        // strip raw price text
        const cleanPrice = parseFloat(rawPriceText.replace(/[^0-9.]/g, ""));
        if (isNaN(cleanPrice)) {
            throw new Error(`Failed to parse price string: ${rawPriceText}`);
        }
        return cleanPrice;
    }
    catch (error) {
        console.error(`Failed to scrape Aritzia: ${productUrl}`, error);
        throw new Error("Scrape failed. Target might be blocking us.");
    }
    finally {
        // MANDATORY CLEANUP: close the context, even if the scrape fails.
        if (context) {
            await context.close();
        }
    }
}
//# sourceMappingURL=aritziaScraper.js.map