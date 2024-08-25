import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, ScrollView, Image } from 'react-native';
import { Plus } from 'react-native-feather';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

import { useProducts } from './../../../hooks/products/organization/fetchProducts';

import { ProductTopHeader, SearchAndFilter } from '~/components/product-list';
import CategoryItem from '~/components/product-list/category-item';
import { View, Text } from '~/components/shared';
import { THEME } from '~/constants/theme';
import useAuthStore from '~/store/auth';
import { CategoryProps } from '~/components/product-list/types';
import { ApiData } from './../../../components/product-list/categories';

const ListCategories = () => {
  const { t } = useTranslation();
  type listViewOption = 'list' | 'grid';
  const [listView, setListView] = useState<listViewOption>('list');
  const authstore = useAuthStore();
  const orgId = authstore.data?.organisations[0].organisation_id;
  const [query, setQuery] = useState<string>('');
  // dummy data

  const { data, isError, isLoading } = useProducts(orgId);
  // const data = ApiData;
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text size="2xl" weight="semiBold">
          {t('Loading')}
        </Text>
      </View>
    );
  }
  let searchData = data?.map((item) => {
    const result = item.products?.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    if (result && result.length > 0) {
      return { ...item, products: result };
    }
    return null;
  });
  searchData = searchData?.filter((item) => item !== null);

  return (
    <>
      <View style={styles.container}>
        <ProductTopHeader listViewOption={listView} setListViewOption={setListView} />
        <SearchAndFilter query={query} setQuery={setQuery} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {searchData?.length && searchData.length > 0 ? (
            <View style={{ padding: THEME.spacing.md }}>
              {data && (
                <FlatList
                  scrollEnabled={false}
                  data={searchData}
                  renderItem={({ item, index }) => <CategoryItem {...item} />}
                  contentContainerStyle={{ gap: THEME.spacing.lg }}
                />
              )}
            </View>
          ) : query !== '' ? (
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text size="xl" weight="medium">
                {t('No Products Found')}
              </Text>
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
                {t('No products yet, please add product')}
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
