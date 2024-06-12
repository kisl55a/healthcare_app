import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { Button, TextField } from '@mui/material';

const NotificationForm: React.FC = () => {
  const { addNotificationMutation } = useNotifications();
  const [notification, setNotification] = React.useState('');

  const handleAddNotification = () => {
    if (notification.trim() !== '') {
      addNotificationMutation.mutate(notification);
      setNotification('');
    }
  };

  return (
    <div>
      <TextField
        label="New Notification"
        value={notification}
        onChange={(e) => setNotification(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddNotification}>
        Add Notification
      </Button>
    </div>
  );
};

export default NotificationForm;
