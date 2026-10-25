// app/(tabs)/notifications.jsx
// Notifications Screen (Screen 8 in the PDF Wireframe)
// Displays expiry alert notifications grouped by "Today" and "Earlier", with an Alerts toggle and "Mark all as read".

import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import { sampleNotifications } from '@/data/sampleData';

export default function NotificationsScreen() {
  // Store notification list in local state so the user can mark notifications as read
  // In the future phase, notifications will be queried from the database:
  // SELECT * FROM Notification ORDER BY notifyDate DESC;
  const [notifications, setNotifications] = useState(sampleNotifications);

  // Toggle state for whether system notifications are active
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  // Filter notifications into sections: "Today" and "Earlier"
  const todayNotifications = notifications.filter((n) => n.section === 'Today');
  const earlierNotifications = notifications.filter((n) => n.section === 'Earlier');

  // Toggle the alert status badge in header
  function handleToggleAlerts() {
    setAlertsEnabled(!alertsEnabled);
  }

  // Mark all notifications as read
  function handleMarkAllAsRead() {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isRead: true }))
    );
    Alert.alert('Notifications', 'All notifications marked as read.');
  }

  // Tapping a notification
  function handleNotificationPress(notification) {
    Alert.alert('Expiry Alert', notification.title);
  }

  // Header right button: [Alerts On] or [Alerts Off]
  const alertsBadge = (
    <TouchableOpacity
      style={[
        styles.alertsBadge,
        !alertsEnabled && styles.alertsBadgeDisabled,
      ]}
      onPress={handleToggleAlerts}
      activeOpacity={0.7}
    >
      <Text style={styles.alertsBadgeText}>
        {alertsEnabled ? 'Alerts On' : 'Alerts Off'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Screen Header with Alerts badge in top right matching wireframe */}
      <ScreenHeader
        title="Notifications"
        showBack={false}
        rightElement={alertsBadge}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* "Mark all as read" link on right side */}
        <View style={styles.markReadRow}>
          <TouchableOpacity onPress={handleMarkAllAsRead} activeOpacity={0.7}>
            <Text style={styles.markReadText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        {/* Section 1: Today */}
        <Text style={styles.sectionHeader}>Today</Text>
        {todayNotifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.notificationCard,
              item.isRead && styles.readNotificationCard,
            ]}
            onPress={() => handleNotificationPress(item)}
            activeOpacity={0.7}
          >
            {/* Alert Icon (circle with exclamation mark !) */}
            <View style={styles.alertIconCircle}>
              <Text style={styles.alertIconText}>!</Text>
            </View>

            {/* Notification Title */}
            <Text style={styles.notificationTitle} numberOfLines={1}>
              {item.title}
            </Text>

            {/* Timestamp */}
            <Text style={styles.notificationTime}>{item.time}</Text>
          </TouchableOpacity>
        ))}

        {/* Section 2: Earlier */}
        <Text style={[styles.sectionHeader, { marginTop: 24 }]}>Earlier</Text>
        {earlierNotifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.notificationCard,
              item.isRead && styles.readNotificationCard,
            ]}
            onPress={() => handleNotificationPress(item)}
            activeOpacity={0.7}
          >
            {/* Alert Icon */}
            <View style={styles.alertIconCircle}>
              <Text style={styles.alertIconText}>!</Text>
            </View>

            {/* Notification Title */}
            <Text style={styles.notificationTitle} numberOfLines={1}>
              {item.title}
            </Text>

            {/* Timestamp */}
            <Text style={styles.notificationTime}>{item.time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  // Top right header badge [Alerts On]
  alertsBadge: {
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  alertsBadgeDisabled: {
    backgroundColor: '#e0e0e0',
  },
  alertsBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111111',
  },
  // Mark all as read button
  markReadRow: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  markReadText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 10,
  },
  // Notification row card matching wireframe Page 8
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    marginVertical: 5,
  },
  readNotificationCard: {
    backgroundColor: '#f9f9f9',
    borderColor: '#666666',
  },
  // Circle with ! icon
  alertIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#ffffff',
  },
  alertIconText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111111',
  },
  notificationTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#111111',
  },
  notificationTime: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 8,
  },
});
