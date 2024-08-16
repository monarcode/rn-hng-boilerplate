import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, ScrollView, Image } from 'react-native';
import { Plus } from 'react-native-feather';
import { FlatList } from 'react-native-gesture-handler';

import { useProducts } from './../../../hooks/products/organization/fetchProducts';

import { ProductTopHeader, SearchAndFilter } from '~/components/product-list';
import CategoryItem from '~/components/product-list/category-item';
import { View, Text } from '~/components/shared';
import { THEME } from '~/constants/theme';
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
    <>
      <View style={styles.container}>
        <ProductTopHeader listViewOption={listView} setListViewOption={setListView} />
        <SearchAndFilter />
        <ScrollView showsVerticalScrollIndicator={false}>
          {data?.length && data.length > 0 ? (
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
          ) : (
            <View style={{ flex: 1, alignItems: 'center', marginTop: '20%' }}>
              <View style={{ width: 400, height: 200 }}>
                <Image
                  resizeMode="contain"
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../../assets/images/emptyCart.png')}
                />
              </View>

              <Text size="md" weight="medium" style={{ marginTop: 30 }}>
                No products yet, please add product
              </Text>
            </View>
          )}
        </ScrollView>
        <Pressable
          style={styles.floatingButton}
          onPress={() => {
            router.push('/(create-product)/create-product');
          }}>
          <Plus width={25} height={25} color={THEME.colors.white} />
        </Pressable>
      </View>
    </>
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
