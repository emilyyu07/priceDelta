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
    const retailer = await prisma.retailer.upsert({
      where: { name: storeName },
      update: {},
      create: {
        name: "Aritzia",
        apiUrl: "https://www.aritzia.com",
        isActive: true,
      },
    });

    // create "pending" Listing in PostgreSQL so we have an ID
    const listing = await prisma.productListing.create({
      data: {
        url: cleanUrl,
        productId: externalId, // assume existing item
        retailerId: retailer.id,
        currentPrice: 0, // Placeholder until the worker finishes
        isActive: false, // Mark as pending
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
    res
      .status(400)
      .json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};
