import { Image, Pressable, StyleSheet } from 'react-native';
import { View, Text } from '../shared';
import React from 'react';
import { ProductProps } from './types';
import { THEME } from '~/constants/theme';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { createUniqueId } from '~/modules/products/constants';

const { width } = Dimensions.get('window');

const ProductItemListTile = (product: ProductProps) => {
  let date = new Date(product.created_at);
  let date_modified = date.toDateString();
  const router = useRouter();

  function moreDetails(productId: string) {
    router.push(`/productdetail/${productId}`);
  }

  const uniqueId = createUniqueId(product.name, product.id);
  return (
    <Pressable onPressIn={() => moreDetails(product.id)}>
      <View style={styles.container}>
        <View style={styles.contentWrapperContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
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
                <View style={styles.indicator}></View>
                <Text>{product.status}</Text>
              </View>
            </View>
          </View>
        </View>
        <Text size="xl" weight="bold">
          ${parseFloat(`${product.price}`)}
        </Text>
      </View>
    </Pressable>
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
