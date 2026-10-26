import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { colors } from '@/constants/theme';

const tabs = [
  { name: 'index', title: 'Home', icon: '⌂' },
  { name: 'inventory', title: 'Inventory', icon: '▣' },
  { name: 'notifications', title: 'Alerts', icon: '!' },
  { name: 'statistics', title: 'Stats', icon: '▥' },
  { name: 'settings', title: 'Settings', icon: '⚙' },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => (
              <Text style={[styles.tabBarIcon, { color }]}>{tab.icon}</Text>
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  focused && styles.tabBarLabelActive,
                  { color },
                ]}
              >
                {tab.title}
              </Text>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    minHeight: 72,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 6,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  tabBarLabelActive: {
    fontWeight: '800',
  },
  tabBarIcon: {
    fontSize: 21,
    fontWeight: '700',
  },
});
