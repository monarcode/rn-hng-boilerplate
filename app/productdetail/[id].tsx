import { Button, Text, View } from '~/components/shared';
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> 36f173b (Add product details ui screen implementation)
=======
import React, { useState } from 'react';
>>>>>>> fc6b8d1 (Add product details feature)
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Platform, ScrollView } from 'react-native';
import Header from '~/modules/products/components/Header';
import HeaderHero from '~/modules/products/components/HeaderHero';

import ProductContent from '~/modules/products/components/ProductContent';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { ProductDetails } from '~/modules/products/constants';
>>>>>>> 9508895 (implement product details ui and update related components)

const ProductDetail = () => {
  const insets = useSafeAreaInsets();

=======
import { ProductDetails } from '~/modules/products/constants';

const ProductDetail = () => {
  const insets = useSafeAreaInsets();
  const data = ProductDetails;
>>>>>>> 36f173b (Add product details ui screen implementation)
=======

const ProductDetail = () => {
  const insets = useSafeAreaInsets();

>>>>>>> fc6b8d1 (Add product details feature)
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <Header
        menu={() => console.log('menu clicked')}
        search={() => console.log('Seach clicked')}
        notification={() => console.log('notification clicked')}
      />

      <HeaderHero title={'Product Description'} goback={() => console.log('go back clicked')} />

<<<<<<< HEAD
      <View style={styles.container}>
<<<<<<< HEAD
<<<<<<< HEAD
        <ProductContent />
=======
        <ProductContent data={data} />
>>>>>>> 36f173b (Add product details ui screen implementation)
=======
        <ProductContent />
>>>>>>> fc6b8d1 (Add product details feature)
      </View>
=======
      <ScrollView contentContainerStyle={styles.container}>
        <ProductContent data={ProductDetails} title={'user'} />
      </ScrollView>
>>>>>>> 9508895 (implement product details ui and update related components)
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
<<<<<<< HEAD
<<<<<<< HEAD
            Checkout
=======
            Edit
>>>>>>> 36f173b (Add product details ui screen implementation)
=======
            Checkout
>>>>>>> fc6b8d1 (Add product details feature)
          </Button>
          <Button
            containerStyle={{
              width: '50%',
<<<<<<< HEAD
<<<<<<< HEAD
              backgroundColor: '#F68C1E',
            }}>
            Add to Cart
=======
              backgroundColor: '#DC2626',
            }}>
            Delete
>>>>>>> 36f173b (Add product details ui screen implementation)
=======
              backgroundColor: '#F68C1E',
            }}>
            Add to Cart
>>>>>>> fc6b8d1 (Add product details feature)
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
    // bottom: 0,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: 5,
  },
});
