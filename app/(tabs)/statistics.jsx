import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import NumberCard from '@/components/NumberCard';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { colors, cardShadow } from '@/constants/theme';

const periods = ['Week', 'Month', 'Year'];

export default function StatisticsScreen() {
  const db = useSQLiteContext();
  // El variable da bey7faz el period elli el user ekhtarha fo2.
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [stats, setStats] = useState({
    consumed: 0,
    discarded: 0,
    wasteRate: 'N/A',
    chartData: [],
  });

  useFocusEffect(
    useCallback(() => {
      loadStatistics();
    }, [db, selectedPeriod])
  );

  function dateToText(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getPeriodStart() {
    const today = new Date();

    if (selectedPeriod === 'Week') {
      today.setDate(today.getDate() - 6);
    } else if (selectedPeriod === 'Month') {
      today.setDate(1);
    } else {
      today.setMonth(0, 1);
    }

    return dateToText(today);
  }

  function makeChartData(items) {
    if (selectedPeriod === 'Week') {
      const labels = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'];
      const start = new Date(`${getPeriodStart()}T00:00:00`);

      return labels.map((label, index) => {
        const value = items.filter((item) => {
          const itemDate = new Date(`${item.createdAt}T00:00:00`);
          const dayNumber = Math.round((itemDate - start) / 86400000);
          return dayNumber === index;
        }).length;
        return { label, value };
      });
    }

    if (selectedPeriod === 'Month') {
      return ['W1', 'W2', 'W3', 'W4'].map((label, index) => {
        const value = items.filter((item) => {
          const day = Number(item.createdAt.slice(8, 10));
          return Math.min(Math.floor((day - 1) / 7), 3) === index;
        }).length;
        return { label, value };
      });
    }

    return ['Q1', 'Q2', 'Q3', 'Q4'].map((label, index) => {
      const value = items.filter((item) => {
        const month = Number(item.createdAt.slice(5, 7));
        return Math.floor((month - 1) / 3) === index;
      }).length;
      return { label, value };
    });
  }

  async function loadStatistics() {
    try {
      // Hena bngeb el consumed wel discarded 7asab el period.
      const items = await db.getAllAsync(
        `SELECT status, createdAt FROM Item
         WHERE status IN ('Consumed', 'Discarded') AND createdAt >= ?`,
        getPeriodStart()
      );
      const consumed = items.filter((item) => item.status === 'Consumed').length;
      const discarded = items.filter((item) => item.status === 'Discarded').length;
      const total = consumed + discarded;
      const wasteRate = total === 0
        ? 'N/A'
        : `${Math.round((discarded / total) * 100)}%`;

      setStats({
        consumed,
        discarded,
        wasteRate,
        chartData: makeChartData(items),
      });
    } catch (error) {
      setStats({ consumed: 0, discarded: 0, wasteRate: 'N/A', chartData: [] });
    }
  }

  const totalFinished = stats.consumed + stats.discarded;
  const consumedPercent = totalFinished === 0
    ? 0
    : Math.round((stats.consumed / totalFinished) * 100);
  const discardedPercent = totalFinished === 0 ? 0 : 100 - consumedPercent;

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
          <Text style={styles.chartTitle}>Items in selected period</Text>

          <View style={styles.barChartContainer}>
            <View style={styles.barsArea}>
              {stats.chartData.map((bar) => (
                <View key={bar.label} style={styles.barColumn}>
                  <View
                    style={[
                      styles.barVisual,
                      { height: Math.min(bar.value * 14, 110) },
                    ]}
                  />
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
                <Text style={styles.circleRatioText}>
                  {totalFinished === 0
                    ? 'No data'
                    : `${consumedPercent} / ${discardedPercent}`}
                </Text>
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
          <Text style={styles.historyNote}>
            Based on item creation dates. Status history is not available yet.
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barVisual: {
    width: '68%',
    maxWidth: 38,
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
  historyNote: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 17,
    color: colors.mutedText,
  },
});
