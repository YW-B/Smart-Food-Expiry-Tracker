// El component da bey3red label wa7ed ma3 ra2am wa7ed.

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, cardShadow } from '@/constants/theme';

export default function NumberCard({ label, value, style }) {
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
    minHeight: 104,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    ...cardShadow,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.mutedText,
    textAlign: 'center',
    marginBottom: 6,
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
  },
});
