import { Button, Text, View } from '~/components/shared';
import React, { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Platform, ScrollView } from 'react-native';

import HeaderHero from '~/modules/products/components/HeaderHero';

import ProductContent from '~/modules/products/components/ProductContent';
import { convertImageToArray } from '~/modules/products/constants';
import { ProductData, ProductDetailProps } from '~/modules/products/types';
import { useRouter } from 'expo-router';

// Corrected typing for the ProductDetail component
const ProductDetail = ({ title = 'Organizational' }: ProductDetailProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const imageUrl = 'https://picsum.photos/200/300';

  const images = convertImageToArray(imageUrl);
  console.log(images);

  const goBack = () => {
    router.back();
  };

  const ProductDetails: ProductData = {
    id: '1',
    created_at: '2024-08-12T14:30:00Z', // Example ISO date-time string
    updated_at: '2024-08-12T14:30:00Z', // Example ISO date-time string
    name: 'Product 01',
    description:
      'A fusion of ripe bananas, pure honey, and succulent raspberries with our bread. Crafted to perfection.',
    category: 'Appetizers',
    images: images, // Array of images
    price: 29,
    cost_price: 20, // Example cost price
    quantity: 100,
    size: 'Medium', // Example size
    stock_status: 'In Stock', // Example stock status
    deletedAt: null, // Example deletedAt value
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <HeaderHero title={'Product Description'} goback={goBack} />

      <ScrollView contentContainerStyle={styles.container}>
        <ProductContent data={ProductDetails} title={title} />
      </ScrollView>
      <View
        style={[
          styles.buttonContainer,
          { bottom: Platform.OS === 'ios' ? insets.bottom : insets.bottom + 20 },
        ]}>
        <View style={styles.rowGap}>
          <Button
            containerStyle={{
              width: '50%',
              borderColor: '#E2E8F0',
            }}
            variant="outline"
            textStyle={{
              color: '#000',
            }}>
            {title === 'Organizational' && ' Edit'}
            {title === 'user' && ' Checkout'}
          </Button>
          <Button
            containerStyle={{
              width: '50%',
              backgroundColor: title === 'Organizational' ? '#DC2626' : '#F68C1E',
            }}>
            {title === 'Organizational' && 'Delete'}
            {title === 'user' && ' Add to Cart'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 16,
    marginBottom: 100,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowGap: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: 5,
  },
});
