// components/AppInput.jsx
// A reusable beginner-friendly text input component with a label and optional right button.

import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

/**
 * AppInput
 * @param {string} label - Label shown above the text input
 * @param {string} value - Current value stored in parent state
 * @param {function} onChangeText - Callback when user types
 * @param {string} placeholder - Placeholder hint text
 * @param {string} keyboardType - Type of keyboard (default, numeric, etc.)
 * @param {boolean} editable - Whether user can edit the field
 * @param {React.ReactNode} rightElement - Optional button or icon beside or inside the input
 * @param {object} style - Optional container style
 */
export default function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  editable = true,
  rightElement = null,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      {/* Label above the field */}
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input,
            !editable && styles.readOnlyInput,
            rightElement ? styles.inputWithRightElement : null,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#888888"
          keyboardType={keyboardType}
          editable={editable}
        />
        {rightElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#ffffff',
    color: '#111111',
  },
  inputWithRightElement: {
    marginRight: 8,
  },
  readOnlyInput: {
    backgroundColor: '#f5f5f5',
    color: '#555555',
  },
});
