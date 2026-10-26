import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';
import SimpleButton from '@/components/SimpleButton';
import SimplePickerModal from '@/components/SimplePickerModal';

const reminderOptions = [
  '1 day before',
  '2 days before',
  '3 days before',
  '1 week before',
];
const sortOptions = ['Expiry Date', 'Item Name', 'Category'];

export default function SettingsScreen() {
  // El variables dol bey7afzo el settings elli el user ekhtarha.
  const [expiryAlerts, setExpiryAlerts] = useState(true);
  const [remindDays, setRemindDays] = useState('2 days before');
  const [showRemindPicker, setShowRemindPicker] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [syncToCalendar, setSyncToCalendar] = useState(false);
  const [defaultSort, setDefaultSort] = useState('Expiry Date');
  const [showSortPicker, setShowSortPicker] = useState(false);

  function toggleAlerts() {
    setExpiryAlerts(!expiryAlerts);
  }

  function connectCalendar() {
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

  function toggleCalendarSync() {
    if (!calendarConnected) {
      Alert.alert(
        'Calendar Not Connected',
        'Please connect your Google Calendar account first.'
      );
      return;
    }
    setSyncToCalendar(!syncToCalendar);
  }

  function showAbout() {
    Alert.alert(
      'About Smart Food Tracker',
      'Smart Food Tracker v1.0\nMobile Application Development Course\n\nDesigned for tracking food shelf life and minimizing kitchen waste.'
    );
  }

  function chooseReminder(option) {
    setRemindDays(option);
    setShowRemindPicker(false);
  }

  function chooseSort(option) {
    setDefaultSort(option);
    setShowSortPicker(false);
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Settings" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionHeading}>Notifications</Text>

        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Enable expiry alerts</Text>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              expiryAlerts ? styles.toggleOn : styles.toggleOff,
            ]}
            onPress={toggleAlerts}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleText}>
              {expiryAlerts ? 'On' : 'Off'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => setShowRemindPicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.settingLabel}>Remind me: {remindDays}</Text>
          <Text style={styles.dropdownArrow}>v</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionHeading, styles.laterSection]}>
          Google Calendar
        </Text>

        <SimpleButton
          title={
            calendarConnected
              ? 'Google Calendar Connected ✓'
              : 'Connect Google Calendar'
          }
          variant="primary"
          onPress={connectCalendar}
        />

        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Sync reminders to calendar</Text>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              syncToCalendar ? styles.toggleOn : styles.toggleOff,
            ]}
            onPress={toggleCalendarSync}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleText}>
              {syncToCalendar ? 'On' : 'Off'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.lastSyncedText}>
          {calendarConnected ? 'Last synced: Just now' : 'Last synced: 23 Oct'}
        </Text>

        <Text style={[styles.sectionHeading, styles.laterSection]}>General</Text>

        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => setShowSortPicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.settingLabel}>Default sort: {defaultSort}</Text>
          <Text style={styles.dropdownArrow}>v</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => router.push('/categories')}
          activeOpacity={0.7}
        >
          <Text style={styles.settingLabel}>Manage Categories</Text>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingCard}
          onPress={showAbout}
          activeOpacity={0.7}
        >
          <Text style={styles.settingLabel}>About</Text>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </ScrollView>

      <SimplePickerModal
        visible={showRemindPicker}
        title="Remind Me"
        options={reminderOptions}
        onSelect={chooseReminder}
        onClose={() => setShowRemindPicker(false)}
      />

      <SimplePickerModal
        visible={showSortPicker}
        title="Default Sorting"
        options={sortOptions}
        onSelect={chooseSort}
        onClose={() => setShowSortPicker(false)}
      />
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
  laterSection: {
    marginTop: 24,
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
});
