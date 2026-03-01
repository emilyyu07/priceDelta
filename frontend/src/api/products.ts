// product API calls
import { apiClient } from "./client";

export const productsApi = {
  getAll: async () => {
    const response = await apiClient.get("/products");
    return response.data;
  },
  getById: async (productId: string) => {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  },
  //submit URL to playwright scraper
  trackUrl: async (url: string) => {
    const response = await apiClient.post("/products/track", { url });
    return response.data;
  },
  //poll db to check if scraper is done
  getTrackStatus: async (listingId: string) => {
    const response = await apiClient.get(`/products/track/${listingId}/status`);
    return response.data;
  },
};
