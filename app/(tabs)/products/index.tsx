import { View, Text, ListRenderItem, Pressable, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { ProductTopHeader, SearchAndFilter } from '~/components/product-list';
import { THEME } from '~/constants/theme';
import ProductItemGridTile from '~/components/product-list/product-item-grid';
import CategoryItem from '~/components/product-list/category-item';
import { FlatList } from 'react-native-gesture-handler';
import { Plus } from 'react-native-feather';
import { router } from 'expo-router';
import { useProducts } from './../../../hooks/products/organization/fetchProducts';
import useAuthStore from '~/store/auth';

const ListCategories = () => {
  type listViewOption = 'list' | 'grid';
  const [listView, setListView] = useState<listViewOption>('list');
  const authstore = useAuthStore();
  const orgId = authstore.data?.organisations[0].organisation_id;
  // dummy data

  const { data, isError, isLoading } = useProducts(orgId);
  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProductTopHeader listViewOption={listView} setListViewOption={setListView} />
      <SearchAndFilter />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: THEME.spacing.md }}>
          {data && (
            <FlatList
              scrollEnabled={false}
              data={data}
              renderItem={({ item, index }) => <CategoryItem {...item} />}
              contentContainerStyle={{ gap: THEME.spacing.lg }}
            />
          )}
        </View>
      </ScrollView>
      <Pressable
        style={styles.floatingButton}
        onPress={() => {
          router.push('/(create-product)/create-product');
        }}>
        <Plus width={25} height={25} color={THEME.colors.white} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    flex: 1,
    gap: THEME.spacing.lg,
  },
  floatingButton: {
    position: 'absolute',
    borderRadius: 1000,
    height: 50,
    width: 50,
    backgroundColor: THEME.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    right: THEME.spacing.md,
    bottom: 10,
  },
});

export default ListCategories;
