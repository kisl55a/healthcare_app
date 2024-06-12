import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface NotificationListProps {
    notifications: string[];
    handleDeleteNotification: (index: number) => void;
}


const NotificationList: React.FC<NotificationListProps> = ({ notifications, handleDeleteNotification }) => {
  return (
    <List>
      {notifications.map((notification, index) => (
        <ListItem key={index}>
          <ListItemText primary={notification} />
          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteNotification(index)} >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NotificationList;