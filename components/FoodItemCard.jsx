// El component da bey3red food item wa7ed gowwa el list.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FoodItemCard({ item, onPress, badge, subtitle }) {

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>

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
