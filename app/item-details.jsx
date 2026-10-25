// app/item-details.jsx
// Item Details Screen (Screen 6 in the PDF Wireframe)
// Basic starter setup for Commit 1.

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';

export default function ItemDetailsScreen() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Item Details" showBack={true} />
      <View style={styles.content}>
        <Text style={styles.text}>Item Details Screen</Text>
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
