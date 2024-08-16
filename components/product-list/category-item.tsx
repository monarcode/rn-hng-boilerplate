import { View, Text } from '../shared';
import React from 'react';
import { CategoryProps } from './types';
import { FlatList } from 'react-native';
import ProductItemGridTile from './product-item-grid';
import { Dimensions } from 'react-native';
import { THEME } from '~/constants/theme';
import ProductItemListTile from './product-item-list';
import { Link } from 'expo-router';

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
        horizontal={true}
        snapToInterval={0.95 * width}
      />
    </View>
  );
};

export default CategoryItem;
