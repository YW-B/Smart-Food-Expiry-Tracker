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
import { colors, cardShadow } from '@/constants/theme';

export default function NotificationsScreen() {
  // El list de state 3ashan "Mark all as read" beyghayar kol notification.
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  function toggleAlerts() {
    setAlertsEnabled(!alertsEnabled);
  }

  function markAllAsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((item) => ({ ...item, isRead: true }))
    );
    Alert.alert('Notifications', 'All notifications marked as read.');
  }

  function showNotification(notification) {
    Alert.alert('Expiry Alert', notification.title);
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
