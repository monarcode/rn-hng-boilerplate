import { StyleSheet } from 'react-native';
import { View, Text } from '../shared';
import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { chartData } from './chart-data';
import { THEME } from '~/constants/theme';
import { Dimensions } from 'react-native';
import FilterItems from '../shared/filter';

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
          hideOrigin
          xAxisThickness={0}
          yAxisThickness={0}
        />
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: THEME.spacing.lg,
  },
  chartContainer: {
    borderColor: THEME.colors.borderLight,
    borderWidth: 1,
    padding: THEME.spacing.md,
    alignItems:'center'
  },
});
