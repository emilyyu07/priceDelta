// web Scraper for Aritzia

import { chromium } from "playwright";
import type { Browser, BrowserContext } from "playwright";

// keep a single global browser instance alive in memory
let globalBrowser: Browser | null = null;

export async function scrapeAritziaPrice(
  productUrl: string,
): Promise<{ price: number; imageUrl: string | null; title: string | null }> {
  console.log(`🔍 [Scraper] Starting scrape for: ${productUrl}`);

  // Add overall timeout
  const timeout = 45000; // 45 seconds total timeout
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(
      () => reject(new Error("Scrape timeout after 45 seconds")),
      timeout,
    );
  });

  // Initialize the browser only if it doesn't exist yet
  if (!globalBrowser) {
    console.log(`🚀 [Scraper] Launching new browser instance...`);
    globalBrowser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-background-timer-throttling",
        "--disable-renderer-backgrounding",
        "--disable-backgrounding-occluded-windows",
        "--memory-pressure-off",
        "--max_old_space_size=4096",
        // Anti-detection flags
        "--disable-blink-features=AutomationControlled",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
      ],
    });
  }

  let context: BrowserContext | null = null;

  try {
    // Rotate user agents to avoid detection
    const userAgents = [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    ];

    const randomUserAgent =
      userAgents[Math.floor(Math.random() * userAgents.length)];

    // reuse browser context with optimizations
    context = await globalBrowser.newContext({
      userAgent: randomUserAgent,
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
      hasTouch: false,
      // Performance optimizations
      ignoreHTTPSErrors: true,
      bypassCSP: true,
      // Reduce resource loading for faster scraping
      javaScriptEnabled: true,
      offline: false,
      // Anti-detection measures
      locale: "en-US",
      timezoneId: "America/New_York",
    });

    // open a new tab
    const page = await context.newPage();

    // Add stealth measures
    await page.addInitScript(() => {
      // Remove webdriver property
      Object.defineProperty(navigator, "webdriver", {
        get: () => undefined,
      });

      // Override plugins
      Object.defineProperty(navigator, "plugins", {
        get: () => [1, 2, 3, 4, 5],
      });

      // Override languages
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en"],
      });
    });

    // Block unnecessary resources for faster loading
    await page.route(
      "**/*.{png,jpg,jpeg,gif,svg,woff,woff2,ttf,css}",
      (route) => {
        route.abort();
      },
    );

    // Block analytics and tracking
    await page.route("**/*.{analytics,pixel,tracking}", (route) => {
      route.abort();
    });

    console.log(`🌐 [Scraper] Navigating to: ${productUrl}`);

    // Navigate with optimized settings
    await page.goto(productUrl, {
      waitUntil: "domcontentloaded",
      timeout: 20000, // Increased timeout for anti-detection
    });

    // Random delay to appear more human (3-8 seconds)
    const randomDelay = Math.floor(Math.random() * 5000) + 3000;
    console.log(`⏳ [Scraper] Waiting ${randomDelay}ms to appear human...`);
    await page.waitForTimeout(randomDelay);

    // Check for bot detection signs
    const pageTitle = await page.title();
    if (
      pageTitle.toLowerCase().includes("robot") ||
      pageTitle.toLowerCase().includes("blocked") ||
      pageTitle.toLowerCase().includes("access denied")
    ) {
      throw new Error("Bot detection detected - page blocked");
    }

    console.log(`🔍 [Scraper] Looking for price elements...`);

    // DOM Extraction with multiple fallbacks
    const priceSelectors = [
      '[data-testid="product-list-price-text"]',
      '[data-testid="product-list-sale-text"]',
      ".price",
      ".sale-price",
      '[class*="price"]',
      '[data-test*="price"]',
    ];

    let rawPriceText = "";
    let priceFound = false;

    // Try each selector
    for (const selector of priceSelectors) {
      try {
        const element = page.locator(selector).first();
        if ((await element.count()) > 0) {
          rawPriceText = await element.innerText();
          console.log(
            `✅ [Scraper] Found price using selector "${selector}": ${rawPriceText}`,
          );
          priceFound = true;
          break;
        }
      } catch (error) {
        console.log(`❌ [Scraper] Selector "${selector}" failed:`, error);
      }
    }

    if (!priceFound) {
      // Try to find any element with price-like text
      const priceElements = await page
        .locator("text=/\\$[0-9]+\\.?[0-9]*/")
        .all();
      if (priceElements.length > 0) {
        rawPriceText = await priceElements[0].innerText();
        console.log(`✅ [Scraper] Found price using regex: ${rawPriceText}`);
        priceFound = true;
      }
    }

    if (!priceFound) {
      throw new Error(
        "DOM Parse Error: Could not find price element. Aritzia may have changed their DOM structure.",
      );
    }

    console.log(
      `💰 [Scraper] Successfully extracted raw price string: ${rawPriceText}`,
    );

    // strip raw price text
    const cleanPrice = parseFloat(rawPriceText.replace(/[^0-9.]/g, ""));

    if (isNaN(cleanPrice)) {
      throw new Error(`Failed to parse price string: ${rawPriceText}`);
    }

    console.log(`📊 [Scraper] Parsed price: $${cleanPrice}`);

    // extract product title
    let productTitle: string | null = null;
    try {
      // First try: og:title meta tag
      const ogTitle = await page
        .locator('meta[property="og:title"]')
        .getAttribute("content");

      if (ogTitle) {
        productTitle = ogTitle;
        console.log(`📝 [Scraper] Found OG title: ${productTitle}`);
      }

      // Second try: h1 with product title
      if (!productTitle) {
        const h1Title = await page
          .locator('h1[data-testid="product-title"], h1.product-title, h1')
          .first()
          .innerText();

        if (h1Title) {
          productTitle = h1Title.trim();
          console.log(`📝 [Scraper] Found H1 title: ${productTitle}`);
        }
      }

      // Third try: title tag (clean it)
      if (!productTitle) {
        const pageTitle = await page.title();
        if (pageTitle) {
          // Remove "Aritzia" from title and clean
          productTitle = pageTitle
            .replace(/Aritzia/gi, "")
            .replace(/\|.*$/, "")
            .replace(/^\s+|\s+$/g, "")
            .trim();

          if (productTitle) {
            console.log(`📝 [Scraper] Found page title: ${productTitle}`);
          }
        }
      }
    } catch (err) {
      console.warn("⚠️ [Scraper] Could not extract product title:", err);
    }

    // extract image URL
    let imageUrl: string | null = null;
    try {
      // First try: open graph image
      let ogImage = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");

      if (ogImage) {
        // Convert relative URLs to absolute
        if (ogImage.startsWith("//")) {
          ogImage = "https:" + ogImage;
        } else if (ogImage.startsWith("/")) {
          ogImage = "https://www.aritzia.com" + ogImage;
        }
        imageUrl = ogImage;
        console.log(`🖼️ [Scraper] Found OG image: ${imageUrl}`);
      }

      // Second try: twitter image
      if (!imageUrl) {
        const twitterImage = await page
          .locator('meta[name="twitter:image"]')
          .getAttribute("content");

        if (twitterImage) {
          if (twitterImage.startsWith("//")) {
            imageUrl = "https:" + twitterImage;
          } else if (twitterImage.startsWith("/")) {
            imageUrl = "https://www.aritzia.com" + twitterImage;
          } else {
            imageUrl = twitterImage;
          }
          console.log(`🖼️ [Scraper] Found Twitter image: ${imageUrl}`);
        }
      }

      // Third try: look for product image in the page
      if (!imageUrl) {
        const productImage = await page
          .locator(
            'img[alt*="product"], img[data-testid="product-image"], .product-image img',
          )
          .first()
          .getAttribute("src");

        if (productImage) {
          if (productImage.startsWith("//")) {
            imageUrl = "https:" + productImage;
          } else if (productImage.startsWith("/")) {
            imageUrl = "https://www.aritzia.com" + productImage;
          } else {
            imageUrl = productImage;
          }
          console.log(`🖼️ [Scraper] Found product image: ${imageUrl}`);
        }
      }

      // Fourth try: any image with product-related class or alt
      if (!imageUrl) {
        const images = await page.locator("img").all();
        for (const img of images.slice(0, 5)) {
          // Check first 5 images
          const src = await img.getAttribute("src");
          const alt = await img.getAttribute("alt");

          if (
            src &&
            (alt?.toLowerCase().includes("product") || src.includes("product"))
          ) {
            if (src.startsWith("//")) {
              imageUrl = "https:" + src;
            } else if (src.startsWith("/")) {
              imageUrl = "https://www.aritzia.com" + src;
            } else {
              imageUrl = src;
            }
            console.log(`🖼️ [Scraper] Found fallback image: ${imageUrl}`);
            break;
          }
        }
      }
    } catch (err) {
      console.warn("⚠️ [Scraper] Could not find product image:", err);
    }

    console.log(`✅ [Scraper] Scrape completed successfully!`);

    return {
      price: cleanPrice,
      imageUrl: imageUrl,
      title: productTitle,
    };
  } catch (error) {
    console.error(
      `❌ [Scraper] Failed to scrape Aritzia: ${productUrl}`,
      error,
    );

    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes("timeout")) {
        throw new Error(
          "Scrape timeout - Aritzia might be slow or blocking us",
        );
      } else if (error.message.includes("bot detection")) {
        throw new Error("Bot detection detected - Aritzia has blocked us");
      } else if (error.message.includes("DOM Parse Error")) {
        throw new Error("DOM structure changed - need to update selectors");
      }
    }

    throw new Error("Scrape failed. Target is blocking or structure changed.");
  } finally {
    // cleanup - close the context even if the scrape fails
    if (context) {
      await context.close();
    }
    console.log(`🧹 [Scraper] Context closed`);
  }
}
