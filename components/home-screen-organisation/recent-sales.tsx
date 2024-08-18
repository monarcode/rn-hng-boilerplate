import { View, Text } from '../shared';
import { StyleSheet } from 'react-native';
import React from 'react';
import { THEME } from '~/constants/theme';
import SalesCard from './sales-card';

const RecentSales = () => {
    const Sales = [
      {
        name: 'Prince Emelife',
        email: 'special@test.mail',
        amount: 3000,
      },
      {
        name: 'Felix Hope',
        email: 'special@test.mail',
        amount: 2500,
      },
      {
        name: 'Ekuke Gideon',
        email: 'special@test.mail',
        amount: 1000,
      },
    ];
  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text size="2xl" weight="bold">
          Recent Sales
        </Text>
        <Text size="xl" style={{ color: THEME.colors.neutral[400] }}>
          See More
        </Text>
      </View>
      <SalesCard {...Sales[0]} />
      <SalesCard {...Sales[1]} />
      <SalesCard {...Sales[2]} />
    </View>
  );
};

export default RecentSales;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth:1,
    borderColor:THEME.colors.borderLight,
    padding:THEME.spacing.sm,
    marginBottom:20
  },
  headerTextContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:THEME.spacing.md
  }
});
