// app/(tabs)/inventory.jsx
// Inventory Screen (Screen 4 in the PDF Wireframe)
// Basic starter setup for Commit 1, fully fleshed out in Commit 2.

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';

export default function InventoryScreen() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Inventory" />
      <View style={styles.content}>
        <Text style={styles.text}>Inventory Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333333',
  },
});
