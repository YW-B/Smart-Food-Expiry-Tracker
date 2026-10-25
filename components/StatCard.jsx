// components/StatCard.jsx
// A reusable stat card component to display counts and metrics.
// Used on the Home Dashboard and Waste Statistics screens.

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * StatCard
 * @param {string} label - Title or description of the stat (e.g. "Expiring Soon", "Consumed")
 * @param {string | number} value - The numerical value to show (e.g. 3, 24, "25%")
 * @param {object} style - Optional extra style for custom widths or backgrounds
 */
export default function StatCard({ label, value, style }) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 80,
    backgroundColor: '#ebebeb',
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 6,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111111',
    textAlign: 'center',
  },
});
