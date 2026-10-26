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
import { colors, cardShadow } from '@/constants/theme';

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
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 40,
  },
  periodTabsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: colors.surface,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  periodTabActive: {
    backgroundColor: colors.primary,
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.mutedText,
  },
  periodTabTextActive: {
    color: colors.surface,
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
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 18,
    backgroundColor: colors.surface,
    marginBottom: 16,
    ...cardShadow,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
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
    backgroundColor: colors.primary,
    borderWidth: 0,
    borderRadius: 8,
  },
  barLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    color: colors.mutedText,
  },
  chartBaseline: {
    width: '100%',
    height: 2,
    backgroundColor: colors.border,
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
    backgroundColor: colors.primary,
    borderWidth: 8,
    borderColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleRatioText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primaryDark,
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
    backgroundColor: colors.primary,
    borderWidth: 0,
    borderRadius: 5,
    marginRight: 10,
  },
  legendBoxDiscarded: {
    width: 18,
    height: 18,
    backgroundColor: colors.accent,
    borderWidth: 0,
    borderRadius: 5,
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  wasteRateContainer: {
    marginTop: 4,
    paddingHorizontal: 4,
  },
  wasteRateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
});
