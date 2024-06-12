import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  addNotification,
  deleteNotification,
  NOTIFICATION_KEY
} from "../services/notificationService";

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const notificationsQuery = useQuery({
    queryKey: [NOTIFICATION_KEY],
    queryFn: fetchNotifications,
  });

  const addNotificationMutation = useMutation({
    mutationFn: addNotification,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [NOTIFICATION_KEY] });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [NOTIFICATION_KEY] });
    },
  });

  return {
    notificationsQuery,
    addNotificationMutation,
    deleteNotificationMutation,
  };
};
