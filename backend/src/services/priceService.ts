import prisma from "../config/prisma.js";

export async function saveScrapedPrice(listingId: string, newPrice: number) {
  try {
    // Start the transaction
    await prisma.$transaction(async (tx) => {
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

    console.log(
      `Successfully saved new price: $${newPrice} for listing ${listingId}`,
    );
  } catch (error) {
    console.error(
      `Transaction failed! Rolling back changes for listing ${listingId}`,
      error,
    );
    throw error;
  }
}
