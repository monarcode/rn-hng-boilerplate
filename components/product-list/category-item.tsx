import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Dimensions } from 'react-native';

import ProductItemGridTile from './product-item-grid';
import ProductItemListTile from './product-item-list';
import { CategoryProps } from './types';
import { View, Text } from '../shared';

import { THEME } from '~/constants/theme';

const { width } = Dimensions.get('window');

const CategoryItem = (category: CategoryProps) => {
  return (
    <View style={{ gap: THEME.spacing.md }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 0.89 * width,
        }}>
        <Text size="xl" weight="semiBold">
          {category.name}
        </Text>
        <Link href={`/products/${category.name}`}>
          <Text size="lg" style={{ color: THEME.colors.neutral[400] }}>
            See More
          </Text>
        </Link>
      </View>
      <FlatList
        data={category.products}
        renderItem={({ item, index }) => <ProductItemListTile {...item} />}
        bounces={false}
        contentContainerStyle={{ gap: THEME.spacing.sm + 2 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        snapToInterval={0.95 * width}
      />
    </View>
  );
};

export default CategoryItem;
