// app/(tabs)/_layout.jsx
// Bottom Tab Navigator for the 5 primary tabs shown on wireframe Page 1:
// 1. Home (index)
// 2. Inventory (inventory)
// 3. Notifications (notifications)
// 4. Statistics (statistics)
// 5. Settings (settings)

import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelActive, { color }]}>
              Home
            </Text>
          ),
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelActive, { color }]}>
              Inventory
            </Text>
          ),
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelActive, { color }]}>
              Notifications
            </Text>
          ),
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelActive, { color }]}>
              Statistics
            </Text>
          ),
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelActive, { color }]}>
              Settings
            </Text>
          ),
          tabBarIcon: () => null,
        }}
      />
      {/* Hide any unused legacy tab routes */}
      <Tabs.Screen
        name="two"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    minHeight: 64,
    backgroundColor: '#dcdcdc',
    borderTopWidth: 2,
    borderTopColor: '#333333',
    paddingTop: 8,
  },
  tabBarItem: {
    borderRightWidth: 1,
    borderRightColor: '#b0b0b0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabBarLabelActive: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
