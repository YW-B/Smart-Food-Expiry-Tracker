// Da input baseet beyesta2bel el text men el user.

import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '@/constants/theme';

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
        placeholderTextColor={colors.mutedText}
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
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.text,
  },
});
