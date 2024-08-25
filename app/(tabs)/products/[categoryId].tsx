import { useLocalSearchParams, router } from 'expo-router';
import { StyleSheet, Pressable, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Plus } from 'react-native-feather';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import GoBack from '~/components/go-back';
import { SearchAndFilter } from '~/components/product-list';
import ProductItemListTile from '~/components/product-list/product-item-list';
import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import { useProducts } from '~/hooks/products/organization/fetchProducts';
import useAuthStore from '~/store/auth';
import { ApiData } from '~/components/product-list/categories';

const ViewProductsByCategory = () => {
  const { t } = useTranslation();
  const authstore = useAuthStore();
  const [query, setQuery] = useState<string>('');
  const orgId = authstore.data?.organisations[0].organisation_id;
  const { categoryId } = useLocalSearchParams();
  const { data } = useProducts(orgId);
  const category = data?.find((item) => item.name === categoryId);
  const products = category?.products?.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <GoBack />
        <Text size="3xl" weight="bold">
          {category?.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            /* menu logic */
          }}>
          <Image source={require('~/assets/menu.png')} />
        </TouchableOpacity>
      </View>
      <SearchAndFilter query={query} setQuery={setQuery} />
      <View style={{ padding: THEME.spacing.md }}>
        {products && products?.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductItemListTile {...item} />}
            contentContainerStyle={{ gap: THEME.spacing.lg }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text size="xl" weight="medium">
              {t('No Products Found')}
            </Text>
          </View>
        )}
      </View>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: THEME.colors.border,
    marginTop: 50,
    marginBottom: 20,
  },
  itemListStyle: {
    padding: THEME.spacing.md,
  },
});

export default ViewProductsByCategory;
