import { Router } from "express";
import { trackProduct } from "../controllers/product.controller.js";
import prisma from "../config/prisma.js";
const router = Router();

router.post("/track", trackProduct);
// get all products (browsing page)
router.get("/", async (_req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        listings: {
          select: {
            currentPrice: true,
            retailer: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

//get a single product with price history (chart page)
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        listings: {
          include: {
            retailer: true,
            priceHistory: {
              orderBy: {
                timestamp: "asc",
              },
            },
          },
        },
      },
    });

    //check if product exists, return error if not
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    //if valid, return product data
    res.json(product);
  } catch (error) {
    next(error);
  }
});

export default router;
