import React, { SetStateAction } from 'react';
import { TextInput, View } from '../shared';
import { Pressable, StyleSheet } from 'react-native';
import { THEME } from '~/constants/theme';
import { Filter } from 'react-native-feather';
import Slider from '../../assets/icons/sliders.svg';
import FilterItems from '../shared/filter';
import { Search } from 'react-native-feather';

type QueryProps = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
};

const SearchAndFilter = ({ query, setQuery }: QueryProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search Product"
          containerStyle={{ borderWidth: 0 }}
          inputStyle={{ fontSize: 16 }}
          onChange={(e) => {
            setQuery(e.nativeEvent.text);
          }}
        />
        <View style={styles.slider}>
          <Search width={24} height={24} color={THEME.colors.neutral[400]} />
        </View>
      </View>
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
    width: '100%',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.spacing.sm,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  slider: {
    position: 'absolute',
    paddingLeft: THEME.spacing.md,
    right: 10,
    justifyContent: 'center',
    height: '100%',
  },
});
export default SearchAndFilter;
