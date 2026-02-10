import { apiClient } from "./client";
import type { Notification } from "../types";

export const notificationsApi = {
  getNotifications: async (): Promise<Notification[]> => {
    const res = await apiClient.get("/notifications");
    return res.data;
  },

  markAsRead: async (notificationId: string): Promise<Notification> => {
    const res = await apiClient.patch(`/notifications/${notificationId}/read`);
    return res.data;
  },
};
