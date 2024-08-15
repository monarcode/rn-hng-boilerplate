import React from 'react';
import { TextInput, View } from '../shared';
import { Pressable, StyleSheet } from 'react-native';
import { THEME } from '~/constants/theme';
import { Filter } from 'react-native-feather';
import Slider from '../../assets/icons/sliders.svg';
import FilterItems from '../shared/filter';
const SearchAndFilter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Search by price" containerStyle={{ borderWidth: 0 }} inputStyle={{fontSize:16}} />
        <View style={styles.slider}>
          <Slider />
        </View>
      </View>
    <FilterItems/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterContainer: {
    backgroundColor: THEME.colors.primary,
    padding: THEME.spacing.md,
    borderRadius: THEME.spacing.sm,
  },
  inputContainer: {
    width: '85%',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.spacing.sm,
    justifyContent:'center'
  },
  slider: {
    position: 'absolute',
    paddingLeft: THEME.spacing.md,
    right: 10,
    justifyContent:'center',
    borderLeftWidth: 1,
    height:'100%',
    borderColor:THEME.colors.border
  },
});
export default SearchAndFilter;
