// A simple button used throughout the app.

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
  // Primary: gray filled background matching wireframe wire buttons
  primaryButton: {
    backgroundColor: '#b5b5b5',
    borderColor: '#333333',
  },
  // Secondary: clean white background with dark border
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
