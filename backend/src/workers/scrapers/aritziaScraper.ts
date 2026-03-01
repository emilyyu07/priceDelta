// web Scraper for Aritzia

import { chromium } from "playwright";
import type { Browser, BrowserContext } from "playwright";

// keep a single global browser instance alive in memory
let globalBrowser: Browser | null = null;

export async function scrapeAritziaPrice(productUrl: string): Promise<number> {
  // initialize the browser only if it doesn't exist yet
  if (!globalBrowser) {
    globalBrowser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for Linux servers/Docker
    });
  }

  let context: BrowserContext | null = null;

  try {
    // create a fresh, isolated context
    // spoof the User-Agent (so we do not appear as headless)
    context = await globalBrowser.newContext({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      viewport: { width: 1920, height: 1080 }, // pretend to be a desktop
      deviceScaleFactor: 1,
      hasTouch: false,
    });

    // open a new tab
    const page = await context.newPage();

    // navigate to the Aritzia product URL
    console.log(`Navigating to: ${productUrl}`);
    await page.goto(productUrl, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // DOM Extraction
    await page.waitForSelector(
      '[data-testid="product-list-price-text"], [data-testid="product-list-sale-text"]',
      { timeout: 15000 },
    );

    let rawPriceText = "";

    // always check for the SALE price first
    const saleLocator = page.getByTestId("product-list-sale-text");

    if ((await saleLocator.count()) > 0) {
      // product is on sale
      rawPriceText = await saleLocator.first().innerText();
      console.log(`Found SALE price: ${rawPriceText}`);
    } else {
      // if not, check for the REGULAR price
      const regularLocator = page.getByTestId("product-list-price-text");

      if ((await regularLocator.count()) > 0) {
        rawPriceText = await regularLocator.first().innerText();
        console.log(`Found REGULAR price: ${rawPriceText}`);
      } else {
        // fallback: DOM changed, we cannot locate price
        throw new Error(
          "DOM Parse Error: Could not find sale or regular price.",
        );
      }
    }

    console.log(`Successfully extracted raw price string: ${rawPriceText}`);

    // strip raw price text
    const cleanPrice = parseFloat(rawPriceText.replace(/[^0-9.]/g, ""));

    if (isNaN(cleanPrice)) {
      throw new Error(`Failed to parse price string: ${rawPriceText}`);
    }

    return cleanPrice;
  } catch (error) {
    console.error(`Failed to scrape Aritzia: ${productUrl}`, error);
    throw new Error("Scrape failed. Target is blocking.");
  } finally {
    // cleanup - close the context, even if the scrape fails.
    if (context) {
      await context.close();
    }
  }
}
