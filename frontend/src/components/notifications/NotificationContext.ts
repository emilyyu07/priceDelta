import { createContext } from 'react';
import type { Notification } from '../../types';

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;
  markAsRead: (id: string) => Promise<void>;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
