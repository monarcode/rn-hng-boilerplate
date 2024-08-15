import { Image, StyleSheet } from 'react-native';
import { View, Text } from '../shared';
import React from 'react';
import { ProductProps } from './types';
import { THEME } from '~/constants/theme';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProductItemListTile = (product: ProductProps) => {
  let date = new Date(product.created_at);
  let date_modified = date.toDateString();
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapperContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.textContentContainer}>
          <View>
            <Text size="2xl" weight="medium">
              {product.name}
            </Text>
            <Text size="lg">P001</Text>
          </View>
          <View>
            <Text size="xl" weight="semiBold">
              Status:
            </Text>
            <Text>{product.status}</Text>
          </View>
        </View>
      </View>
      <Text size="2xl" weight="bold">
        ${product.price}.00
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#F7F7F7',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 0.85 * width,
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
    width: '45%',
    borderRadius: 10,
  },
});

export default ProductItemListTile;
