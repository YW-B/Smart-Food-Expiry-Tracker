// app/(tabs)/inventory.jsx
// Inventory Screen (Screen 4 in the PDF Wireframe)
// Displays the full food inventory with search, filtering by expiry status, sorting, and item selection.

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
import ItemCard from '@/components/ItemCard';
import { sampleItems } from '@/data/sampleData';

export default function InventoryScreen() {
  // Local state for user search text input
  const [searchQuery, setSearchQuery] = useState('');

  // Local state for currently active filter tab: 'all' | 'soon' | 'expired'
  const [activeFilter, setActiveFilter] = useState('all');

  // Local state for sorting mode: 'expiry' | 'name' | 'category'
  const [sortBy, setSortBy] = useState('expiry');

  // In the future, this list will come from SQLite:
  // SELECT * FROM Item WHERE ... ORDER BY ...
  const [items] = useState(sampleItems);

  // 1. FILTERING LOGIC
  // We filter the items based on:
  // a) The selected filter tab ('All', 'Expiring Soon', 'Expired')
  // b) The text typed in the search bar (matches name or category)
  const filteredItems = items.filter((item) => {
    // Check search term
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Check filter tab
    if (activeFilter === 'soon') {
      return item.daysLeft >= 0 && item.daysLeft <= 7;
    }
    if (activeFilter === 'expired') {
      return item.daysLeft < 0 || item.status === 'Discarded';
    }
    // 'all' includes every item
    return true;
  });

  // 2. SORTING LOGIC
  // Simple sorting implementation for educational clarity
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

  // Toggle or switch between simple sort options
  function handleCycleSort() {
    if (sortBy === 'expiry') setSortBy('name');
    else if (sortBy === 'name') setSortBy('category');
    else setSortBy('expiry');
  }

  // Label for sort button based on state
  function getSortLabel() {
    if (sortBy === 'name') return 'Sort by: Name v';
    if (sortBy === 'category') return 'Sort by: Category v';
    return 'Sort by: Expiry Date v';
  }

  return (
    <View style={styles.container}>
      {/* Screen Header */}
      <ScreenHeader title="Inventory" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar - Rounded pill matching wireframe Page 4 */}
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

        {/* Filter Pills Row: [All] [Expiring Soon] [Expired] */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === 'all' && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter('all')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'all' && styles.filterTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === 'soon' && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter('soon')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'soon' && styles.filterTextActive,
              ]}
            >
              Expiring Soon
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === 'expired' && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter('expired')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'expired' && styles.filterTextActive,
              ]}
            >
              Expired
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sort By Dropdown Button */}
        <View style={styles.sortRow}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={handleCycleSort}
            activeOpacity={0.7}
          >
            <Text style={styles.sortText}>{getSortLabel()}</Text>
          </TouchableOpacity>
        </View>

        {/* Inventory Item Cards */}
        {sortedItems.map((item) => {
          // Badge shows remaining days (e.g. "2d", "10d") or "exp"
          const badgeText = item.daysLeft < 0 ? 'exp' : `${item.daysLeft}d`;

          return (
            <ItemCard
              key={item.id}
              item={item}
              subtitle={`${item.category} - ${item.expiryDate}`}
              badge={badgeText}
              onPress={() => {
                router.push({
                  pathname: '/item-details',
                  params: { id: item.id.toString() },
                });
              }}
            />
          );
        })}

        {sortedItems.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found matching criteria.</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button (+) bottom right */}
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
  // Search bar styled as a long pill with border
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
  // Filter buttons row
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
  // Sort button container
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
  // Floating Action Button
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
