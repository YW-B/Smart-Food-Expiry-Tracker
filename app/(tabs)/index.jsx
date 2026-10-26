import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';
import NumberCard from '@/components/NumberCard';
import FoodItemCard from '@/components/FoodItemCard';
import { sampleItems } from '@/data/sampleData';
import { colors, cardShadow } from '@/constants/theme';

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
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>SMART FOOD TRACKER</Text>
          <Text style={styles.heroTitle}>Use it before you lose it.</Text>
          <Text style={styles.heroText}>
            A quick look at what needs your attention this week.
          </Text>
        </View>

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

      {/* Lama el user yedos 3ala el button da, hayro7 le screen Add Item. */}
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
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 100,
  },
  heroCard: {
    marginTop: 6,
    marginBottom: 18,
    padding: 20,
    borderRadius: 22,
    backgroundColor: colors.primary,
    ...cardShadow,
  },
  eyebrow: {
    marginBottom: 8,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    color: colors.accent,
  },
  heroTitle: {
    marginBottom: 6,
    fontSize: 24,
    fontWeight: '800',
    color: colors.surface,
  },
  heroText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.primarySoft,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -4,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.mutedText,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 18,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    ...cardShadow,
  },
  fabText: {
    fontSize: 30,
    fontWeight: '500',
    color: colors.surface,
    lineHeight: 32,
  },
});
