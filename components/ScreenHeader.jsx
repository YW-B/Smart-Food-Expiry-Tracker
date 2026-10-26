// components/ScreenHeader.jsx
// A reusable beginner-friendly screen header bar.
// Displays the screen title, an optional back button, and an optional right action element.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * ScreenHeader
 * @param {string} title - Title text in the center
 * @param {boolean} showBack - Whether to show the back arrow button
 * @param {function} onBack - Optional custom back action; defaults to router.back()
 * @param {React.ReactNode} rightElement - Optional element on the right (e.g. action badge or button)
 */
export default function ScreenHeader({
  title,
  showBack = false,
  onBack,
  rightElement = null,
}) {
  // If the user provided a custom back function, call it, otherwise go back with Expo Router
  function handleBackPress() {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        {/* Left Slot: Back Button or spacer */}
        <View style={styles.sideSlot}>
          {showBack ? (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.backArrow}>{'<'}</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Center Slot: Screen Title */}
        <View style={styles.centerSlot}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Right Slot: Custom action or spacer */}
        <View style={[styles.sideSlot, styles.rightSlot]}>
          {rightElement}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#e6e6e6',
  },
  header: {
    height: 60,
    backgroundColor: '#e6e6e6',
    borderBottomWidth: 1.5,
    borderBottomColor: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  sideSlot: {
    width: 60,
    justifyContent: 'center',
  },
  rightSlot: {
    alignItems: 'flex-end',
  },
  backButton: {
    paddingVertical: 6,
    paddingRight: 10,
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111111',
  },
  centerSlot: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
});
