import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Platform, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, View } from '~/components/shared';
import { useProducts } from '~/hooks/products/organization/fetchProducts';
import HeaderHero from '~/modules/products/components/HeaderHero';
import ProductContent from '~/modules/products/components/ProductContent';
import { ProductData, ProductDetailProps } from '~/modules/products/types';
import useAuthStore from '~/store/auth';

const ProductDetail = ({ title = 'user' }: ProductDetailProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const goBack = () => {
    router.back();
  };
  const { id } = useLocalSearchParams();

  const authstore = useAuthStore();
  const orgId = authstore.data?.organisations[0].organisation_id;

  const { data } = useProducts(orgId);

  const findProductById = (data: ProductData[], id: string) => {
    for (const category of data) {
      const product = category.products.find((product) => product.id === id);
      if (product) {
        return product;
      }
    }
    return null;
  };

  const product = findProductById(data || [], id as string);

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <HeaderHero title="Product Description" goback={goBack} />

      <ScrollView contentContainerStyle={styles.container}>
        <ProductContent data={product} title={title} />
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
