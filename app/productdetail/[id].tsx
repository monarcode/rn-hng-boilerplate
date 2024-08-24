import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import BasicHeader from '~/components/basic-header';
import { Button, View } from '~/components/shared';
import { useProducts } from '~/hooks/products/organization/fetchProducts';
import HeaderHero from '~/modules/products/components/HeaderHero';
import ProductContent from '~/modules/products/components/ProductContent';
import { findProductById } from '~/modules/products/constants';
import { useDeleteProduct } from '~/modules/products/hooks/deleteProduct';
import { ProductDetailProps } from '~/modules/products/types';
import { ProductService } from '~/services/product';
import useAuthStore from '~/store/auth';

const ProductDetail = ({ title = 'Organizational' }: ProductDetailProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const { id } = useLocalSearchParams();
  const authstore = useAuthStore();
  const orgId = authstore.data?.organisations[0].organisation_id;
  const { data } = useProducts(orgId);

  const product = data ? findProductById(data, id as string) : null;

  const { onDelete, isDeleting } = useDeleteProduct();

  const handleDeleteProduct = () => {
    if (!product) {
      Alert.alert('Error', 'Product not found');
      return;
    }

    onDelete(product.id);
  };

  function editProductByID(productId: string) {
    router.push(`/(create-product)/${productId}`);
  }

  return (
    <View style={[styles.safeArea]}>
      <BasicHeader label="Product Description" />

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
            onPress={() => editProductByID(product.id)}
            containerStyle={{
              width: '50%',
              borderColor: '#E2E8F0',
            }}
            variant="outline"
            textStyle={{
              color: '#000',
            }}>
            {title === 'Organizational' ? 'Edit' : 'Checkout'}
          </Button>
          <Button
            onPress={handleDeleteProduct}
            disabled={isDeleting}
            containerStyle={{
              width: '50%',
              backgroundColor: title === 'Organizational' ? '#DC2626' : '#F68C1E',
              opacity: isDeleting === true ? 0.5 : 1,
            }}>
            {title === 'Organizational' ? 'Delete' : 'Add to Cart'}
          </Button>
        </View>
      </View>
    </View>
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
