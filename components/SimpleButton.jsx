// Da button baseet momken nesta5demo fe ay screen.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, cardShadow } from '@/constants/theme';

export default function SimpleButton({ title, onPress, variant = 'primary', style }) {
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSecondary ? styles.secondaryButton : styles.primaryButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, isSecondary && styles.secondaryText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    borderWidth: 1,
  },
  // El primary button lawn el background beta3o gray.
  primaryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...cardShadow,
  },
  // El secondary button abyad w 7awaleh border 8ame2.
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.surface,
  },
  secondaryText: {
    color: colors.primaryDark,
  },
});
