import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

const tabs = [
  { name: 'index', title: 'Home' },
  { name: 'inventory', title: 'Inventory' },
  { name: 'notifications', title: 'Notifications' },
  { name: 'statistics', title: 'Statistics' },
  { name: 'settings', title: 'Settings' },
];

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
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: () => null,
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
