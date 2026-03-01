export function parseUrl(rawUrl: string) {
  try {
    // parse raw string
    const parsedUrl = new URL(rawUrl);

    // reconstruct the clean URL (ignores ?query=params and #hash_fragments)
    // parsedUrl.origin = "https://www.aritzia.com"
    // parsedUrl.pathname = "/en/product/effortless-pant/77775.html"
    const cleanUrl = `${parsedUrl.origin}${parsedUrl.pathname}`;

    // extract the externalId
    const match = parsedUrl.pathname.match(/\/(\d+)\.html$/);
    const externalId = match ? match[1] : null;

    if (!externalId) {
      throw new Error("Could not extract Aritzia Product ID from URL");
    }

    return {
      cleanUrl,
      externalId,
    };
  } catch (error) {
    throw new Error("Invalid URL provided");
  }
}

export function extractStoreName(url: string): string {
  try {
    const hostname = new URL(url).hostname; // e.g., "www.garageclothing.ca"

    // split the hostname by periods
    const parts = hostname.split(".");

    // filter out common subdomains and top-level domains
    const ignoreList = [
      "www",
      "shop",
      "store",
      "com",
      "ca",
      "co",
      "uk",
      "org",
      "net",
    ];

    const meaningfulParts = parts.filter((part) => !ignoreList.includes(part));

    if (meaningfulParts.length > 0) {
      const brand = meaningfulParts[0]!;
      return brand.charAt(0).toUpperCase() + brand.slice(1);
    }

    return "Unknown Retailer";
  } catch (error) {
    return "Unknown Retailer";
  }
}
