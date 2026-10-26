// El component da howa el header elli benesta5demo fo2 fel screens.
// Momken ye3red title, back button, aw button tani 3al yemeen.

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
  // Law fe custom back function nesta5demha, gheir keda nerga3 be Expo Router.
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
        {/* El makan da lel back button aw space fady. */}
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

        {/* Hena ben3red esm el screen fel nos. */}
        <View style={styles.centerSlot}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* El makan da le ay action 3al yemeen aw space fady. */}
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
