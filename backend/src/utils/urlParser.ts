export function parseUrl(rawUrl: string) {
  try {
    // parse raw string
    const parsedUrl = new URL(rawUrl);

    // reconstruct the clean URL (ignores ?query=params and #hash_fragments)
    // parsedUrl.origin = "https://www.aritzia.com"
    // parsedUrl.pathname = "/en/product/effortless-pant/77775.html"
    const cleanUrl = `${parsedUrl.origin}${parsedUrl.pathname}`;

    // extract the externalId (the numbers before .html)
    // use a Regular Expression (Regex) to find consecutive digits before .html
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
