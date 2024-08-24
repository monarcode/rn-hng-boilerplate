import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '../shared';
import { ProductProps } from './types';

import { THEME } from '~/constants/theme';
import { currency } from '~/libs/currency';
import { createUniqueId } from '~/modules/products/constants';

const { width } = Dimensions.get('window');

const ProductItemListTile = (product: ProductProps) => {
  const date = new Date(product.created_at);
  const date_modified = date.toDateString();
  const router = useRouter();

  function moreDetails(productId: string) {
    router.push(`/productdetail/${productId}`);
  }

  const uniqueId = createUniqueId(product.name, product.id);
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapperContainer}>
        <Pressable
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onPress={() => moreDetails(product.id)}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </Pressable>
        <View style={styles.textContentContainer}>
          <View>
            <Text size="xl" weight="medium">
              {product.name}
            </Text>
            <Text size="lg">{uniqueId}</Text>
          </View>
          <View>
            <Text size="xl" weight="semiBold" style={{ color: THEME.colors.neutral[300] }}>
              Status:
            </Text>
            <View style={styles.statusContainer}>
              <View style={styles.indicator} />
              <Text>{product.status}</Text>
            </View>
          </View>
        </View>
      </View>
      <Text size="xl" weight="bold">
        {currency(product.price, {
          notation: 'compact',
          maximumFractionDigits: 0,
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 0.89 * width,
    padding: THEME.spacing.sm,
  },
  contentWrapperContainer: {
    flexDirection: 'row',
    gap: THEME.spacing.md,
  },
  textContentContainer: {
    gap: THEME.spacing.lg,
  },
  image: {
    width: 0.3 * width,
    borderRadius: 5,
    resizeMode: 'cover',
    height: 0.2 * width,
  },
  indicator: {
    height: 6,
    width: 6,
    borderRadius: 1000,
    backgroundColor: '#6DC347',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default ProductItemListTile;
