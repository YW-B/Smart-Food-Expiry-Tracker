import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';
import NumberCard from '@/components/NumberCard';
import FoodItemCard from '@/components/FoodItemCard';
import { sampleItems } from '@/data/sampleData';

export default function HomeScreen() {
  const expiringThisWeek = sampleItems.filter((item) => {
    return item.status === 'Active' && item.daysLeft >= 0 && item.daysLeft <= 7;
  });

  const expiringSoonCount = sampleItems.filter(
    (item) => item.status === 'Active' && item.daysLeft >= 0 && item.daysLeft <= 3
  ).length;

  const expiredCount = sampleItems.filter(
    (item) => item.daysLeft < 0 || item.status === 'Discarded'
  ).length;

  function openItem(itemId) {
    router.push({
      pathname: '/item-details',
      params: { id: String(itemId) },
    });
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Expiry Tracker" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <NumberCard label="Expiring Soon:" value={expiringSoonCount} />
          <NumberCard label="Expired:" value={expiredCount} />
          <NumberCard label="Total Items:" value={sampleItems.length} />
        </View>

        <Text style={styles.sectionTitle}>Expiring This Week</Text>

        {expiringThisWeek.map((item) => (
          <FoodItemCard
            key={item.id}
            item={item}
            subtitle={`${item.category} - ${item.daysLeft} days`}
            onPress={() => openItem(item.id)}
          />
        ))}

        {expiringThisWeek.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items expiring this week!</Text>
          </View>
        )}
      </ScrollView>

      {/* Pressing this button opens the form for a new food item. */}
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
