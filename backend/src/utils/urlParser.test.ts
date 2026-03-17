import { describe, expect, it } from "vitest";
import { extractStoreName, parseUrl } from "./urlParser";

describe("parseUrl", () => {
  it("extracts externalId and normalizes URL", () => {
    const { externalId, cleanUrl } = parseUrl(
      "https://www.aritzia.com/en/product/effortless-pant/77775.html?color=navy",
    );

    expect(externalId).toBe("77775");
    expect(cleanUrl).toBe(
      "https://www.aritzia.com/en/product/effortless-pant/77775.html",
    );
  });

  it("throws on invalid URL", () => {
    expect(() => parseUrl("not-a-url")).toThrow("Invalid URL provided");
  });

  it("throws when no product ID exists in path", () => {
    expect(() =>
      parseUrl("https://www.aritzia.com/en/category/pants"),
    ).toThrow("Could not extract Aritzia Product ID from URL");
  });
});

describe("extractStoreName", () => {
  it("extracts store name from URL", () => {
    expect(extractStoreName("https://www.aritzia.com/product/1")).toBe(
      "Aritzia",
    );
  });

  it("returns fallback for invalid URL", () => {
    expect(extractStoreName("not-a-url")).toBe("Unknown Retailer");
  });
});

