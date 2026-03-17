import { beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "../config/prisma.js";
import { saveScrapedPrice } from "./price.service";
import { checkAlertsForProduct } from "../workers/alertChecker.js";

vi.mock("../config/prisma.js", () => ({
  default: {
    $transaction: vi.fn(),
  },
}));

vi.mock("../workers/alertChecker.js", () => ({
  checkAlertsForProduct: vi.fn(),
}));

describe("saveScrapedPrice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("writes listing/history and triggers alert checks", async () => {
    const tx = {
      productListing: {
        update: vi.fn().mockResolvedValue({ productId: "product-1" }),
      },
      product: {
        update: vi.fn().mockResolvedValue({}),
      },
      priceHistory: {
        create: vi.fn().mockResolvedValue({}),
      },
    };

    vi.mocked(prisma.$transaction).mockImplementation(async (cb: any) => cb(tx));

    await saveScrapedPrice(
      "listing-1",
      99.99,
      "https://img.example/item.jpg",
      "Item Title",
    );

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(tx.productListing.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "listing-1" } }),
    );
    expect(tx.priceHistory.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ listingId: "listing-1", price: 99.99 }),
      }),
    );
    expect(checkAlertsForProduct).toHaveBeenCalledWith("product-1", 99.99);
  });

  it("throws when transaction fails", async () => {
    vi.mocked(prisma.$transaction).mockRejectedValue(new Error("tx failed"));

    await expect(saveScrapedPrice("listing-1", 50)).rejects.toThrow("tx failed");
    expect(checkAlertsForProduct).not.toHaveBeenCalled();
  });
});

