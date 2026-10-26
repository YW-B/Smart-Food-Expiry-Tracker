import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import NumberCard from '@/components/NumberCard';
import { sampleStats } from '@/data/sampleData';

const periods = ['Week', 'Month', 'Year'];

export default function StatisticsScreen() {
  // El variable da bey7faz el period elli el user ekhtarha fo2.
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const stats = sampleStats;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Waste Statistics" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.periodTabsRow}>
          {periods.map((period) => (
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

        <View style={styles.statsRow}>
          <NumberCard
            label="Consumed:"
            value={stats.consumed}
            style={styles.statCard}
          />
          <NumberCard
            label="Discarded:"
            value={stats.discarded}
            style={styles.statCard}
          />
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Items per week</Text>

          <View style={styles.barChartContainer}>
            <View style={styles.barsArea}>
              {stats.weeklyData.map((bar) => (
                <View key={bar.label} style={styles.barColumn}>
                  <View style={[styles.barVisual, { height: bar.value * 14 }]} />
                  <Text style={styles.barLabel}>{bar.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.chartBaseline} />
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Consumed vs Discarded</Text>

          <View style={styles.pieRow}>
            <View style={styles.circleDiagram}>
              <View style={styles.circleInner}>
                <Text style={styles.circleRatioText}>75 / 25</Text>
              </View>
            </View>

            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={styles.legendBoxConsumed} />
                <Text style={styles.legendLabel}>Consumed</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={styles.legendBoxDiscarded} />
                <Text style={styles.legendLabel}>Discarded</Text>
              </View>
            </View>
          </View>
        </View>

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
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statCard: {
    marginHorizontal: 4,
  },
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
