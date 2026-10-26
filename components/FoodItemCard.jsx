// components/ItemCard.jsx
// A reusable card component to display a food item in a list.
// Matches the wireframe style: rectangular bordered card with item details on left and optional badge on right.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * ItemCard
 * @param {object} item - Food item object (name, category, daysLeft, expiryDate, etc.)
 * @param {function} onPress - Function called when card is pressed
 * @param {string} badge - Optional badge text (e.g. "2d", "3 days")
 * @param {string} subtitle - Optional override for subtitle text
 */
export default function ItemCard({ item, onPress, badge, subtitle }) {
  // If no custom subtitle is given, build standard format: "Category - ExpiryDate"
  const itemSubtitle = subtitle || `${item?.category || 'General'} - ${item?.expiryDate || ''}`;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        {/* Item Title: e.g. "Milk" or "Fresh Milk 1L" */}
        <Text style={styles.title} numberOfLines={1}>
          {item?.name || 'Food Item'}
        </Text>

        {/* Item Subtitle: e.g. "Dairy - 26 Oct" or "Dairy - 2 days" */}
        <Text style={styles.subtitle} numberOfLines={1}>
          {itemSubtitle}
        </Text>
      </View>

      {/* Right-hand badge pill (e.g. "2d", "3d") */}
      {badge ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#333333',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  contentContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#555555',
  },
  // Circular/oval badge on the right side of the card
  badgeContainer: {
    backgroundColor: '#cccccc',
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
  },
});
