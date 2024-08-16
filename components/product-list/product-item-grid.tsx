import { Image, StyleSheet } from 'react-native';
import { View, Text, Button } from '../shared';
import React from 'react';
import { THEME } from '~/constants/theme';
import { ProductProps } from './types';
import { Pressable } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProductItemGridTile = (product: ProductProps) => {
  // hardcoded colors for the availability indicator
  // blur-background-green:#e7f7ea
  // main-green: #0e7b1c
  // blurred-orange:#f7dcc4
  return (
    <Pressable style={styles.container} onPress={() => {}}>
      <View style={{ gap: THEME.spacing.xs }}>
        <Image source={{ uri: product.image }} style={styles.image} />
        {/* Item name and price container */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* name and id wrapper */}
          <View>
            <Text size="lg" weight="semiBold">
              {product.name}
            </Text>
            <Text size="sm" weight="light">
              {product.id}
            </Text>
          </View>
          {/* price */}
          <Text size="lg" weight="bold">
            ${product.price}.00
          </Text>
        </View>
        {/* item and price container end */}
        <Text size="md">Breakfast</Text>
        {/* availability indicator container */}
        <View
          style={[
            styles.inStockContainer,
            { backgroundColor: product.status ? '#e7f7ea' : '#f7dcc4' },
          ]}>
          <View
            style={[
              styles.indicator,
              { backgroundColor: product.status ? '#0e7b1c' : THEME.colors.primary },
            ]}></View>
          <Text
            style={{ color: product.status ? '#0e7b1c' : THEME.colors.primary }}
            size="md"
            weight="semiBold">
            {product.status ? 'In stock' : 'Out of stock'}
          </Text>
        </View>
      </View>
      <Button
        variant="outline"
        children="Add to Cart"
        textStyle={{ fontSize: THEME.fontSize['xl'] }}
        containerStyle={{ width: '80%', alignSelf: 'center' }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: THEME.spacing.sm + 2,
    borderWidth: 1,
    gap: THEME.spacing.sm + 5,
    borderRadius: THEME.spacing.sm,
    borderColor: THEME.colors.border,
    width: 0.42 * width,
    paddingTop: THEME.spacing.sm + 5,
  },
  detailAndPriceContainer: {},
  inStockContainer: {
    padding: THEME.spacing.sm,
    borderRadius: 1000,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  indicator: {
    height: 6,
    width: 6,
    borderRadius: 1000,
  },
  image: {
    height: 80,
    width: '100%',
    borderRadius: THEME.spacing.sm,
  },
});
export default ProductItemGridTile;
