// A simple text input used by forms in the app.

import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SimpleInput({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
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
});
