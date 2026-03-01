import type { Request, Response } from "express";
import { scrapeQueue } from "../queue/priceQueue";
import { parseUrl, extractStoreName } from "../utils/urlParser";
import prisma from "../config/prisma";

export const trackProduct = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    // normalize URL
    const { cleanUrl, externalId } = parseUrl(url);

    const storeName = extractStoreName(cleanUrl);

    //ensure retailer exists
    const retailer = await prisma.retailer.upsert({
      where: { name: storeName },
      update: {},
      create: {
        name: "Aritzia",
        apiUrl: "https://www.aritzia.com",
        isActive: true,
      },
    });

    //ensure product exists
    const product = await prisma.product.upsert({
      where: { externalId: externalId },
      update: {},
      create: {
        externalId: externalId,
        title: `Aritzia Item ${externalId}`, // Placeholder name
        // optional: description, category, imageUrl
      },
    });

    // create "pending" Listing in PostgreSQL so we have an ID
    const listing = await prisma.productListing.upsert({
      where: {
        // Prisma generates a special compound key for @@unique([productId, retailerId])
        productId_retailerId: {
          productId: product.id,
          retailerId: retailer.id,
        },
      },
      update: {
        url: cleanUrl,
        isActive: false, // Mark as pending for scraper
      },
      create: {
        productId: product.id,
        retailerId: retailer.id,
        currentPrice: 0,
        url: cleanUrl,
        isActive: false,
      },
    });

    // push job to queue
    await scrapeQueue.add("scrape-aritzia", {
      productUrl: cleanUrl,
      listingId: listing.id,
    });

    //respond to frontend
    res.status(202).json({
      message: "Scrape job added to queue.",
      listingId: listing.id,
      status: "PENDING",
    });
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
