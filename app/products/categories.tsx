import { View, Text, ListRenderItem, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { ProductTopHeader, SearchAndFilter } from '~/components/product-list';
import { THEME } from '~/constants/theme';


const ListCategories = () => {
  type listViewOption = 'list' | 'grid';
  const [listView, setListView] = useState<listViewOption>('list');
  return (
    <View style={styles.container}>
      <ProductTopHeader listViewOption={listView} setListViewOption={setListView} />
      <SearchAndFilter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    flex: 1,
    gap: THEME.spacing.lg,
  },
});

export default ListCategories;
