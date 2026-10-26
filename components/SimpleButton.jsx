// components/AppButton.jsx
// A reusable beginner-friendly button component.
// It supports primary (filled), secondary (outlined), and danger styles.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

/**
 * AppButton
 * @param {string} title - Text displayed inside the button
 * @param {function} onPress - Function called when user taps the button
 * @param {'primary' | 'secondary' | 'danger'} variant - Visual style of button
 * @param {boolean} disabled - Whether button is clickable
 * @param {object} style - Optional custom container styles
 * @param {object} textStyle - Optional custom text styles
 */
export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) {
  // Determine button background and border color based on the selected variant
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'danger' && styles.dangerButton,
    disabled && styles.disabledButton,
    style,
  ];

  // Determine text color based on variant
  const labelStyle = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'danger' && styles.dangerText,
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={labelStyle}>{title}</Text>
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
  primaryText: {
    color: '#111111',
    fontWeight: '600',
    fontSize: 16,
  },
  // Secondary: clean white background with dark border
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#333333',
  },
  secondaryText: {
    color: '#222222',
    fontWeight: '600',
    fontSize: 16,
  },
  // Danger: light red tinted for delete actions
  dangerButton: {
    backgroundColor: '#ffebee',
    borderColor: '#d32f2f',
  },
  dangerText: {
    color: '#d32f2f',
    fontWeight: '600',
    fontSize: 16,
  },
  // Disabled state
  disabledButton: {
    backgroundColor: '#e0e0e0',
    borderColor: '#cccccc',
    opacity: 0.6,
  },
  disabledText: {
    color: '#888888',
  },
  text: {
    fontSize: 16,
  },
});
