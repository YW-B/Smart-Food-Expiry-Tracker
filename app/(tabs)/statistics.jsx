// app/(tabs)/statistics.jsx
// Waste Statistics Screen (Screen 9 in the PDF Wireframe)
// Displays food consumption vs waste metrics, period selector (Week/Month/Year),
// and beginner-friendly custom UI charts using pure React Native Views.

import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import StatCard from '@/components/StatCard';
import { sampleStats } from '@/data/sampleData';

export default function StatisticsScreen() {
  // Period filter state: 'Week' | 'Month' | 'Year'
  const [selectedPeriod, setSelectedPeriod] = useState('Week');

  // Statistics data (will be computed from SQLite aggregate queries in the future:
  // SELECT status, COUNT(*) FROM Item GROUP BY status;)
  const stats = sampleStats;

  // Chart data for weekly items (bar heights scaled for beginner-friendly pure CSS rendering)
  const weeklyBars = [
    { label: 'W1', height: 70, value: 5 },
    { label: 'W2', height: 110, value: 8 },
    { label: 'W3', height: 50, value: 4 },
    { label: 'W4', height: 95, value: 7 },
  ];

  return (
    <View style={styles.container}>
      {/* Screen Header */}
      <ScreenHeader title="Waste Statistics" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Period Selector Tabs: [ Week ] [ Month ] [ Year ] */}
        <View style={styles.periodTabsRow}>
          {['Week', 'Month', 'Year'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodTab,
                selectedPeriod === period && styles.periodTabActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.periodTabText,
                  selectedPeriod === period && styles.periodTabTextActive,
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Overview Stat Cards: Consumed vs Discarded */}
        <View style={styles.statsRow}>
          <StatCard
            label="Consumed:"
            value={stats.consumed}
            style={styles.statCard}
          />
          <StatCard
            label="Discarded:"
            value={stats.discarded}
            style={styles.statCard}
          />
        </View>

        {/* Chart 1 Card: Items per week (Bar Chart) */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Items per week</Text>

          <View style={styles.barChartContainer}>
            {/* The 4 vertical bars */}
            <View style={styles.barsArea}>
              {weeklyBars.map((bar) => (
                <View key={bar.label} style={styles.barColumn}>
                  <View style={[styles.barVisual, { height: bar.height }]} />
                  <Text style={styles.barLabel}>{bar.label}</Text>
                </View>
              ))}
            </View>

            {/* Horizontal baseline line matching wireframe */}
            <View style={styles.chartBaseline} />
          </View>
        </View>

        {/* Chart 2 Card: Consumed vs Discarded (Circular/Donut visualization) */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Consumed vs Discarded</Text>

          <View style={styles.pieRow}>
            {/* Circular Donut Diagram */}
            <View style={styles.circleDiagram}>
              <View style={styles.circleInner}>
                <Text style={styles.circleRatioText}>75 / 25</Text>
              </View>
            </View>

            {/* Legend on the right */}
            <View style={styles.legendContainer}>
              {/* Consumed Legend */}
              <View style={styles.legendItem}>
                <View style={styles.legendBoxConsumed} />
                <Text style={styles.legendLabel}>Consumed</Text>
              </View>

              {/* Discarded Legend */}
              <View style={styles.legendItem}>
                <View style={styles.legendBoxDiscarded} />
                <Text style={styles.legendLabel}>Discarded</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Waste Rate Metric Text matching wireframe bottom */}
        <View style={styles.wasteRateContainer}>
          <Text style={styles.wasteRateText}>
            Waste rate: {stats.wasteRate}
          </Text>
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },
  // Top period tabs row [Week] [Month] [Year]
  periodTabsRow: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#333333',
  },
  periodTabActive: {
    backgroundColor: '#b5b5b5',
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  periodTabTextActive: {
    color: '#111111',
    fontWeight: 'bold',
  },
  // Overview stats row
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statCard: {
    marginHorizontal: 4,
  },
  // Chart container card matching wireframe
  chartCard: {
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 6,
    padding: 16,
    backgroundColor: '#fafafa',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 16,
  },
  // Bar chart layout
  barChartContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  barsArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%',
    height: 130,
    paddingHorizontal: 16,
  },
  barColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 44,
  },
  barVisual: {
    width: 38,
    backgroundColor: '#b5b5b5',
    borderWidth: 1.5,
    borderColor: '#333333',
  },
  barLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#444444',
  },
  chartBaseline: {
    width: '100%',
    height: 2,
    backgroundColor: '#333333',
  },
  // Donut diagram layout
  pieRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  circleDiagram: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#b5b5b5',
    borderWidth: 2,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleRatioText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111111',
  },
  legendContainer: {
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  legendBoxConsumed: {
    width: 18,
    height: 18,
    backgroundColor: '#b5b5b5',
    borderWidth: 1.5,
    borderColor: '#333333',
    marginRight: 10,
  },
  legendBoxDiscarded: {
    width: 18,
    height: 18,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#333333',
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222222',
  },
  // Waste rate bottom text
  wasteRateContainer: {
    marginTop: 4,
    paddingHorizontal: 4,
  },
  wasteRateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
});
