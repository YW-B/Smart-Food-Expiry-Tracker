import React, { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { colors, cardShadow } from '@/constants/theme';
import { createExpiryNotifications } from '@/database/database';
import { getCardDate, getDaysLeft, getTodayDatabaseDate } from '@/utils/dateHelpers';

export default function NotificationsScreen() {
  const db = useSQLiteContext();
  // El list de state 3ashan "Mark all as read" beyghayar kol notification.
  const [notifications, setNotifications] = useState([]);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadNotifications();
    }, [db])
  );

  async function loadNotifications() {
    try {
      await createExpiryNotifications(db);

      // Hena bngeb el alerts ma3 data el item mn el database.
      const savedNotifications = await db.getAllAsync(`
        SELECT Notification.*, Item.name, Item.expiryDate
        FROM Notification
        JOIN Item ON Notification.itemId = Item.id
        ORDER BY Notification.notifyDate DESC, Notification.id DESC
      `);

      const today = getTodayDatabaseDate();
      const readyNotifications = savedNotifications.map((item) => {
        const daysLeft = getDaysLeft(item.expiryDate);
        let title = `${item.name} expires in ${daysLeft} days`;

        if (daysLeft < 0) {
          title = `${item.name} has expired`;
        } else if (daysLeft === 0) {
          title = `${item.name} expires today`;
        } else if (daysLeft === 1) {
          title = `${item.name} expires tomorrow`;
        }

        return {
          ...item,
          title,
          isRead: item.isRead === 1,
          section: item.notifyDate === today ? 'Today' : 'Earlier',
          time: item.notifyDate === today ? 'Today' : getCardDate(item.notifyDate),
        };
      });
      setNotifications(readyNotifications);
    } catch (error) {
      setNotifications([]);
    }
  }

  function toggleAlerts() {
    setAlertsEnabled(!alertsEnabled);
  }

  async function markAllAsRead() {
    try {
      // Hena bn3alem kol el notifications enha et2aret.
      await db.runAsync('UPDATE Notification SET isRead = 1');
      setNotifications((currentNotifications) =>
        currentNotifications.map((item) => ({ ...item, isRead: true }))
      );
      Alert.alert('Notifications', 'All notifications marked as read.');
    } catch (error) {
      Alert.alert('Error', 'Could not update notifications.');
    }
  }

  async function showNotification(notification) {
    try {
      await db.runAsync(
        'UPDATE Notification SET isRead = 1 WHERE id = ?',
        notification.id
      );
      setNotifications((currentNotifications) =>
        currentNotifications.map((item) =>
          item.id === notification.id ? { ...item, isRead: true } : item
        )
      );
      Alert.alert('Expiry Alert', notification.title);
    } catch (error) {
      Alert.alert('Error', 'Could not open this notification.');
    }
  }

  const sections = ['Today', 'Earlier'];

  const alertsBadge = (
    <TouchableOpacity
      style={[
        styles.alertsBadge,
        !alertsEnabled && styles.alertsBadgeDisabled,
      ]}
      onPress={toggleAlerts}
      activeOpacity={0.7}
    >
      <Text style={styles.alertsBadgeText}>
        {alertsEnabled ? 'Alerts On' : 'Alerts Off'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Notifications"
        showBack={false}
        rightElement={alertsBadge}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.markReadRow}>
          <TouchableOpacity onPress={markAllAsRead} activeOpacity={0.7}>
            <Text style={styles.markReadText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        {sections.map((sectionName, sectionIndex) => (
          <View key={sectionName} style={sectionIndex > 0 ? styles.laterSection : null}>
            <Text style={styles.sectionHeader}>{sectionName}</Text>

            {notifications
              .filter((item) => item.section === sectionName)
              .map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.notificationCard,
                    item.isRead && styles.readNotificationCard,
                  ]}
                  onPress={() => showNotification(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.alertIconCircle}>
                    <Text style={styles.alertIconText}>!</Text>
                  </View>
                  <Text style={styles.notificationTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.notificationTime}>{item.time}</Text>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 40,
  },
  alertsBadge: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 11,
    backgroundColor: colors.primarySoft,
  },
  alertsBadgeDisabled: {
    backgroundColor: colors.surface,
  },
  alertsBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  markReadRow: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  markReadText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
  },
  laterSection: {
    marginTop: 24,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    marginVertical: 6,
    ...cardShadow,
  },
  readNotificationCard: {
    backgroundColor: '#FAFBFA',
    borderColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  alertIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: colors.accentSoft,
  },
  alertIconText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  notificationTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.mutedText,
    marginLeft: 8,
  },
});
