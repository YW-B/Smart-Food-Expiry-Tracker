// El component da bey3red label wa7ed ma3 ra2am wa7ed.

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
