import { Button, Text, View } from '~/components/shared';
import React, { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Platform, ScrollView } from 'react-native';
import Header from '~/modules/products/components/Header';
import HeaderHero from '~/modules/products/components/HeaderHero';

import ProductContent from '~/modules/products/components/ProductContent';
import { ProductDetails } from '~/modules/products/constants';
import { ProductDetailProps } from '~/modules/products/types';
import { useRouter } from 'expo-router';

// Corrected typing for the ProductDetail component
const ProductDetail = ({ title = 'user' }: ProductDetailProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <Header
        menu={() => console.log('menu clicked')}
        search={() => console.log('Search clicked')}
        notification={() => console.log('notification clicked')}
      />

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
