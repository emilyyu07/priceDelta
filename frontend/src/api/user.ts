import { apiClient } from "./client";
import type { User } from "../types"; // Import User type

export const userApi = {
  getMe: async () => {
    const res = await apiClient.get("/user/me");
    return res.data;
  },
  updateProfile: async (userData: Partial<User>) => {
    // Accept Partial<User> to allow partial updates
    const res = await apiClient.patch("/user/me", userData);
    return res.data;
  },
};
