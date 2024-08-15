import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Filter } from 'react-native-feather';
import { THEME } from '~/constants/theme';

const FilterItems = () => {
  return (
    <Pressable style={styles.filterContainer}>
      <Filter width={20} height={20} color={THEME.colors.white} stroke={THEME.colors.neutral[300]} strokeWidth={2} />
    </Pressable>
  );
};

export default FilterItems;

const styles = StyleSheet.create({
  filterContainer: {
    borderWidth: 1,
    padding: THEME.spacing.sm,
    borderRadius: THEME.spacing.sm,
    borderColor: THEME.colors.neutral[400],
    width:'15%',
    justifyContent:'center',
    alignItems:'center'
  },
});
