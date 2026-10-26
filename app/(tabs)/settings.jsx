// app/(tabs)/settings.jsx
// Settings Screen (Screen 7 in the PDF Wireframe)
// Manages user preferences for expiry alerts, Google Calendar synchronization, and general defaults.

import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';
import SimpleButton from '@/components/SimpleButton';

export default function SettingsScreen() {
  // 1. Notification preferences state
  const [expiryAlerts, setExpiryAlerts] = useState(true);
  const [remindDays, setRemindDays] = useState('2 days before');
  const [showRemindPicker, setShowRemindPicker] = useState(false);

  // 2. Google Calendar sync preferences state
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [syncToCalendar, setSyncToCalendar] = useState(false);

  // 3. General preferences state
  const [defaultSort, setDefaultSort] = useState('Expiry Date');
  const [showSortPicker, setShowSortPicker] = useState(false);

  // Available options
  const remindOptions = [
    '1 day before',
    '2 days before',
    '3 days before',
    '1 week before',
  ];
  const sortOptions = ['Expiry Date', 'Item Name', 'Category'];

  // Toggle expiry alerts
  function handleToggleAlerts() {
    setExpiryAlerts(!expiryAlerts);
  }

  // Handle Google Calendar connection
  function handleConnectCalendar() {
    Alert.alert(
      'Google Calendar Integration',
      'Google Calendar OAuth 2.0 integration will be connected in the external services phase.\n\nSimulating connection now.',
      [
        {
          text: 'OK',
          onPress: () => {
            setCalendarConnected(true);
            setSyncToCalendar(true);
          },
        },
      ]
    );
  }

  // Toggle calendar sync
  function handleToggleCalendarSync() {
    if (!calendarConnected) {
      Alert.alert(
        'Calendar Not Connected',
        'Please connect your Google Calendar account first.'
      );
      return;
    }
    setSyncToCalendar(!syncToCalendar);
  }

  // Show About Dialog
  function handleShowAbout() {
    Alert.alert(
      'About Smart Food Tracker',
      'Smart Food Tracker v1.0\nMobile Application Development Course\n\nDesigned for tracking food shelf life and minimizing kitchen waste.'
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader title="Settings" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= SECTION 1: NOTIFICATIONS ================= */}
        <Text style={styles.sectionHeading}>Notifications</Text>

        {/* Row 1: Enable expiry alerts */}
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Enable expiry alerts</Text>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              expiryAlerts ? styles.toggleOn : styles.toggleOff,
            ]}
            onPress={handleToggleAlerts}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleText}>
              {expiryAlerts ? 'On' : 'Off'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Row 2: Remind me picker */}
        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => setShowRemindPicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.settingLabel}>Remind me: {remindDays}</Text>
          <Text style={styles.dropdownArrow}>v</Text>
        </TouchableOpacity>

        {/* ================= SECTION 2: GOOGLE CALENDAR ================= */}
        <Text style={[styles.sectionHeading, { marginTop: 24 }]}>
          Google Calendar
        </Text>

        {/* Connect Google Calendar Button */}
        <SimpleButton
          title={
            calendarConnected
              ? 'Google Calendar Connected ✓'
              : 'Connect Google Calendar'
          }
          variant="primary"
          onPress={handleConnectCalendar}
        />

        {/* Sync reminders to calendar row */}
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Sync reminders to calendar</Text>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              syncToCalendar ? styles.toggleOn : styles.toggleOff,
            ]}
            onPress={handleToggleCalendarSync}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleText}>
              {syncToCalendar ? 'On' : 'Off'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Last synced subtext */}
        <Text style={styles.lastSyncedText}>
          {calendarConnected ? 'Last synced: Just now' : 'Last synced: 23 Oct'}
        </Text>

        {/* ================= SECTION 3: GENERAL ================= */}
        <Text style={[styles.sectionHeading, { marginTop: 24 }]}>General</Text>

        {/* Default sort picker */}
        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => setShowSortPicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.settingLabel}>Default sort: {defaultSort}</Text>
          <Text style={styles.dropdownArrow}>v</Text>
        </TouchableOpacity>

        {/* Manage Categories shortcut */}
        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => router.push('/categories')}
          activeOpacity={0.7}
        >
          <Text style={styles.settingLabel}>Manage Categories</Text>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>

        {/* About App button */}
        <TouchableOpacity
          style={styles.settingCard}
          onPress={handleShowAbout}
          activeOpacity={0.7}
        >
          <Text style={styles.settingLabel}>About</Text>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Remind Me Options Modal */}
      <Modal
        visible={showRemindPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowRemindPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowRemindPicker(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Remind Me</Text>
            {remindOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.modalOption}
                onPress={() => {
                  setRemindDays(opt);
                  setShowRemindPicker(false);
                }}
              >
                <Text style={styles.modalOptionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Default Sort Options Modal */}
      <Modal
        visible={showSortPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSortPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSortPicker(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Default Sorting</Text>
            {sortOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.modalOption}
                onPress={() => {
                  setDefaultSort(opt);
                  setShowSortPicker(false);
                }}
              >
                <Text style={styles.modalOptionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    marginVertical: 5,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111111',
    flex: 1,
  },
  // Pill toggle button [ On ] / [ Off ]
  toggleButton: {
    width: 60,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleOn: {
    backgroundColor: '#b5b5b5',
  },
  toggleOff: {
    backgroundColor: '#ffffff',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111111',
  },
  dropdownArrow: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 8,
  },
  arrowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 8,
  },
  lastSyncedText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 6,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#333333',
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111111',
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  modalOptionText: {
    fontSize: 15,
    color: '#222222',
    textAlign: 'center',
  },
});
