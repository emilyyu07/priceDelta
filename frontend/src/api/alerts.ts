import { apiClient } from "./client";
import { AxiosError } from "axios"; // Import AxiosError

export interface CreateAlertData {
  productId: string;
  targetPrice: number;
}

// Helper function to extract error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred.";
};

// Alert API calls (frontend service)
export const alertsApi = {
  create: async (alertData: CreateAlertData) => {
    try {
      const res = await apiClient.post("/alerts", alertData);
      return res.data;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error) || "Failed to create alert.");
    }
  },

  getAlerts: async () => {
    try {
      const res = await apiClient.get("/alerts");
      return res.data;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error) || "Failed to fetch alerts.");
    }
  },

  update: async (alertId: string, data: { targetPrice: number }) => {
    try {
      const res = await apiClient.patch(`/alerts/${alertId}`, data);
      return res.data;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error) || "Failed to update alert.");
    }
  },

  delete: async (alertId: string) => {
    try {
      const res = await apiClient.delete(`/alerts/${alertId}`);
      return res.data;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error) || "Failed to delete alert.");
    }
  },
};
