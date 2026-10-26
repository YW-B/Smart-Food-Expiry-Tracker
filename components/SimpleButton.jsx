// Da button baseet momken nesta5demo fe ay screen.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    borderWidth: 1.5,
  },
  // El primary button lawn el background beta3o gray.
  primaryButton: {
    backgroundColor: '#b5b5b5',
    borderColor: '#333333',
  },
  // El secondary button abyad w 7awaleh border 8ame2.
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#333333',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
});
