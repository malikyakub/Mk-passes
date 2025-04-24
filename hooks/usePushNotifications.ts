import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const lastNotificationIdRef = useRef<string | null>(null);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    async function registerForPushNotificationsAsync(): Promise<void> {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        finalStatus = newStatus;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Permission Required', 'Failed to get push token for notifications!');
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
    }

    registerForPushNotificationsAsync();

    const receivedListener = Notifications.addNotificationReceivedListener(notification => {
      const id = notification.request.identifier;

      if (lastNotificationIdRef.current && lastNotificationIdRef.current !== id) {
        Notifications.dismissNotificationAsync(lastNotificationIdRef.current).catch(() => {});
      }

      lastNotificationIdRef.current = id;
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      const id = response.notification.request.identifier;
      Notifications.dismissNotificationAsync(id).catch(() => {});
    });

    return () => {
      receivedListener.remove();
      responseListener.remove();
    };
  }, []);

  return { expoPushToken };
}
