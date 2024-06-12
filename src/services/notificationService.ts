export type Notification = string;
export const NOTIFICATION_KEY = 'notification';

let notifications: Notification[] = ['Notification 1', 'Notification 2', 'Notification 3'];


export const fetchNotifications = async (): Promise<Notification[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...notifications]);
      }, 100);
    });
  };

  export const addNotification = async (notification: Notification): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        notifications.push(notification);
        resolve();
      }, 100);
    });
  };

  export const deleteNotification = async (index: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (index >= 0 && index < notifications.length) {
          notifications.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Invalid index'));
        }
      }, 100);
    });
  };
