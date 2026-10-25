// app/(tabs)/index.jsx
// Home Dashboard Screen (Screen 1 in the PDF Wireframe)
// Displays overview stat cards, items expiring this week, and a floating add button.

import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';
import StatCard from '@/components/StatCard';
import ItemCard from '@/components/ItemCard';
import { sampleItems } from '@/data/sampleData';

export default function HomeScreen() {
  // Filter items expiring soon (e.g. 7 days or less and active)
  const expiringThisWeek = sampleItems.filter(
    (item) => item.status === 'Active' && item.daysLeft >= 0 && item.daysLeft <= 7
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title="Expiry Tracker" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Overview Cards */}
        <View style={styles.statsRow}>
          <StatCard label="Expiring Soon:" value={3} />
          <StatCard label="Expired:" value={1} />
          <StatCard label="Total Items:" value={24} />
        </View>

        {/* Expiring This Week Section Header */}
        <Text style={styles.sectionTitle}>Expiring This Week</Text>

        {/* List of items expiring this week */}
        {expiringThisWeek.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            subtitle={`${item.category} - ${item.daysLeft} days`}
            onPress={() =>
              router.push({
                pathname: '/item-details',
                params: { id: item.id.toString() },
              })
            }
          />
        ))}
      </ScrollView>

      {/* Floating Action Button (+) to Add Item */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/add-item')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9e9e9e',
    borderWidth: 1.5,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 28,
    fontWeight: '400',
    color: '#111111',
    lineHeight: 32,
  },
});
