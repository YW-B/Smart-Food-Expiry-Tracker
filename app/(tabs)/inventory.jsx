import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';
import FoodItemCard from '@/components/FoodItemCard';
import { sampleItems } from '@/data/sampleData';

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Expiring Soon', value: 'soon' },
  { label: 'Expired', value: 'expired' },
];

export default function InventoryScreen() {
  // These values store the search, filter, and sort chosen by the user.
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('expiry');

  const filteredItems = sampleItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (activeFilter === 'soon') {
      return item.daysLeft >= 0 && item.daysLeft <= 7;
    }
    if (activeFilter === 'expired') {
      return item.daysLeft < 0 || item.status === 'Discarded';
    }
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'expiry') {
      return a.daysLeft - b.daysLeft;
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  function changeSort() {
    if (sortBy === 'expiry') {
      setSortBy('name');
      return;
    }
    if (sortBy === 'name') {
      setSortBy('category');
      return;
    }
    setSortBy('expiry');
  }

  function getSortLabel() {
    if (sortBy === 'name') {
      return 'Sort by: Name v';
    }
    if (sortBy === 'category') {
      return 'Sort by: Category v';
    }
    return 'Sort by: Expiry Date v';
  }

  function openItem(itemId) {
    router.push({
      pathname: '/item-details',
      params: { id: String(itemId) },
    });
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Inventory" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search items"
            placeholderTextColor="#777777"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>

        <View style={styles.filterRow}>
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.value;

            return (
              <TouchableOpacity
                key={option.value}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                onPress={() => setActiveFilter(option.value)}
              >
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.sortRow}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={changeSort}
            activeOpacity={0.7}
          >
            <Text style={styles.sortText}>{getSortLabel()}</Text>
          </TouchableOpacity>
        </View>

        {sortedItems.map((item) => {
          const badgeText = item.daysLeft < 0 ? 'exp' : `${item.daysLeft}d`;

          return (
            <FoodItemCard
              key={item.id}
              item={item}
              subtitle={`${item.category} - ${item.expiryDate}`}
              badge={badgeText}
              onPress={() => openItem(item.id)}
            />
          );
        })}

        {sortedItems.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found matching criteria.</Text>
          </View>
        )}
      </ScrollView>

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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 24,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111111',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  filterPill: {
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: '#ffffff',
  },
  filterPillActive: {
    backgroundColor: '#888888',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222222',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  sortRow: {
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  sortButton: {
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  sortText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
  },
  emptyContainer: {
    padding: 32,
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
