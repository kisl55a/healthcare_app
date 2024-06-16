import { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface Notification {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface NotificationContextProps {
  showNotification: (message: string, severity?: AlertColor) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<Notification>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showNotification = useCallback((message: string, severity: AlertColor = 'info') => {
    setNotification({ open: true, message, severity });
  }, []);

  const handleClose = useCallback(() => {
    setNotification((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}>
        <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};