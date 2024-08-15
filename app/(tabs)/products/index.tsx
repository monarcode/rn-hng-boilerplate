import { View, Text, ListRenderItem, Pressable, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { ProductTopHeader, SearchAndFilter } from '~/components/product-list';
import { THEME } from '~/constants/theme';
import ProductItemGridTile from '~/components/product-list/product-item-grid';
import CategoryItem from '~/components/product-list/category-item';
import { categories } from '~/components/product-list/categories';
import { FlatList } from 'react-native-gesture-handler';

const ListCategories = () => {
  type listViewOption = 'list' | 'grid';
  const [listView, setListView] = useState<listViewOption>('list');
  // dummy data

  return (
    <View style={styles.container}>
      <ProductTopHeader listViewOption={listView} setListViewOption={setListView} />
      <SearchAndFilter />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: THEME.spacing.md }}>
          <FlatList
            scrollEnabled={false}
            data={categories}
            renderItem={({ item, index }) => <CategoryItem {...item} />}
            contentContainerStyle={{ gap: THEME.spacing.lg }}
          />
        </View>
      </ScrollView>
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
