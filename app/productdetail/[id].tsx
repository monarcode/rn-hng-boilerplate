import { Button, Text, View } from '~/components/shared';
import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Platform } from 'react-native';
import Header from '~/modules/products/components/Header';
import HeaderHero from '~/modules/products/components/HeaderHero';

import ProductContent from '~/modules/products/components/ProductContent';
import { ProductDetails } from '~/modules/products/constants';

const ProductDetail = () => {
  const insets = useSafeAreaInsets();
  const data = ProductDetails;
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <Header
        menu={() => console.log('menu clicked')}
        search={() => console.log('Seach clicked')}
        notification={() => console.log('notification clicked')}
      />

      <HeaderHero title={'Product Description'} goback={() => console.log('go back clicked')} />

      <View style={styles.container}>
        <ProductContent data={data} />
      </View>
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
            Edit
          </Button>
          <Button
            containerStyle={{
              width: '50%',
              backgroundColor: '#DC2626',
            }}>
            Delete
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
    gap: 50,
    marginTop: 16,
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
    left: 24,
    right: 24,
  },
});
