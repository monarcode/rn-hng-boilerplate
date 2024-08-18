import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { chartData } from './chart-data';
import { View, Text } from '../shared';
import FilterItems from '../shared/filter';

import { THEME } from '~/constants/theme';

const { width } = Dimensions.get('window');

const Chart = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text size="2xl" weight="bold">
          Overview
        </Text>
        <FilterItems />
      </View>
      <View style={styles.chartContainer}>
        <BarChart
          stackData={chartData}
          barBorderTopLeftRadius={10}
          barBorderTopRightRadius={10}
          width={0.7 * width}
          hideRules
          barWidth={18}
          spacing={25}
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisLabelPrefix="$"
          yAxisLabelSuffix="K"
          maxValue={45}
          stepValue={15}
        />

        <View style={styles.descriptions}>
          {/* description very good*/}
          <View style={styles.descriptionContainer}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 1000,
                backgroundColor: '#EDEFF5',
              }}></View>
            <Text size="md" weight="semiBold" style={{ color: THEME.colors.neutral[400] }}>
              Very Good
            </Text>
          </View>

          {/* description good*/}
          <View style={styles.descriptionContainer}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 1000,
                backgroundColor: '#F59E64',
              }}></View>
            <Text size="md" weight="semiBold" style={{ color: THEME.colors.neutral[400] }}>
              Good
            </Text>
          </View>

          {/* description very good*/}
          <View style={styles.descriptionContainer}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 1000,
                backgroundColor: '#F97316',
              }}></View>
            <Text size="md" weight="semiBold" style={{ color: THEME.colors.neutral[400] }}>
              Poor
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: THEME.spacing.md,
    marginTop: 24,
  },
  chartContainer: {
    borderColor: THEME.colors.borderLight,
    borderWidth: 1,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.md,
    alignItems: 'center',
    borderRadius: 16,
    gap:20
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  descriptions: {
    flexDirection: 'row',
    justifyContent:'space-between',
    width:'67%'
  },
});
