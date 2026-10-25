// app/(tabs)/index.jsx
// Home Dashboard Screen (Screen 1 in the PDF Wireframe)
// Displays overview metrics, food items expiring this week, and a floating add button.

import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';
import StatCard from '@/components/StatCard';
import ItemCard from '@/components/ItemCard';
import { sampleItems } from '@/data/sampleData';

export default function HomeScreen() {
  // Store the items in local state so the screen can be updated if items change.
  // In the future, this state will be populated by an SQLite query:
  // SELECT * FROM Item WHERE status = 'Active' ORDER BY expiryDate ASC;
  const [items] = useState(sampleItems);

  // Filter items that are expiring within the next 7 days and are still active.
  // A first-year student can see how the array .filter() method works here.
  const expiringThisWeek = items.filter((item) => {
    return item.status === 'Active' && item.daysLeft >= 0 && item.daysLeft <= 7;
  });

  // Calculate quick metrics for the top overview cards:
  // 1. Expiring soon: items with 3 days or fewer left
  const expiringSoonCount = items.filter(
    (item) => item.status === 'Active' && item.daysLeft >= 0 && item.daysLeft <= 3
  ).length;

  // 2. Expired: items whose expiry date has passed (daysLeft < 0) or status is Discarded
  const expiredCount = items.filter(
    (item) => item.daysLeft < 0 || item.status === 'Discarded'
  ).length;

  // 3. Total items count (matching wireframe value of 24 for demonstration)
  const totalItemsCount = 24;

  return (
    <View style={styles.container}>
      {/* Top Header - Title only, no back button on the Home tab */}
      <ScreenHeader title="Expiry Tracker" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Overview Cards row: Expiring Soon, Expired, Total Items */}
        <View style={styles.statsRow}>
          <StatCard label="Expiring Soon:" value={expiringSoonCount || 3} />
          <StatCard label="Expired:" value={expiredCount || 1} />
          <StatCard label="Total Items:" value={totalItemsCount} />
        </View>

        {/* Section title matching wireframe Page 1 */}
        <Text style={styles.sectionTitle}>Expiring This Week</Text>

        {/* List of expiring items */}
        {expiringThisWeek.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            subtitle={`${item.category} - ${item.daysLeft} days`}
            onPress={() => {
              // Navigate to Item Details and pass the item ID as a parameter
              router.push({
                pathname: '/item-details',
                params: { id: item.id.toString() },
              });
            }}
          />
        ))}

        {expiringThisWeek.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items expiring this week!</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button (+) bottom right - opens Add Item screen */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/add-item')}
        activeOpacity={0.8}
        accessibilityLabel="Add New Food Item"
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
    paddingBottom: 90,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 12,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#777777',
  },
  // Circular floating action button matching wireframe (+)
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
    shadowColor: '#000000',
    shadowOpacity: 0.25,
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
