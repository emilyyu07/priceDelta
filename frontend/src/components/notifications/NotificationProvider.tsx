import React from 'react';
import type { ReactNode } from 'react';
import { useRealTimeNotifications } from '../../hooks/useRealTimeNotifications';
import { NotificationContext } from './NotificationContext';

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const notificationData = useRealTimeNotifications();

  return (
    <NotificationContext.Provider value={notificationData}>
      {children}
    </NotificationContext.Provider>
  );
};
