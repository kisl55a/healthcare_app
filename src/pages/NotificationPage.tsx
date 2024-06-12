import React from 'react';
import NotificationList from '../components/NotificationList';
import NotificationForm from '../components/NotificationForm';
import { Container, Typography, CircularProgress } from '@mui/material';

import { useNotifications } from '../hooks/useNotifications';

const NotificationsPage: React.FC = () => {
    const { notificationsQuery, deleteNotificationMutation } = useNotifications();

    const handleDeleteNotification = (index: number) => {
        deleteNotificationMutation.mutate(index);
    }

    if (notificationsQuery.isLoading) {
      return <CircularProgress />;
    }

    if (notificationsQuery.isError) {
      return <div>Error loading notifications</div>;
    }

  return (
    <Container>
      <Typography variant="h1" component="h2" gutterBottom>
        Notifications
      </Typography>
      <NotificationForm />
      {deleteNotificationMutation.isPending && <CircularProgress />}
      <NotificationList notifications={notificationsQuery.data || []} handleDeleteNotification={handleDeleteNotification} />
    </Container>
  );
};

export default NotificationsPage;
