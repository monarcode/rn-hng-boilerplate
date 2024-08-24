import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import useAuthStore from '~/store/auth';
import { useProducts } from '~/hooks/products/organization/fetchProducts';
import { ProductData } from '~/modules/products/types';
import { THEME } from '~/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '~/components/go-back';
import { Text } from '~/components/shared';
import EditProductForm from '~/modules/products/components/edit-product-form';
import { ProductDetailType } from '~/modules/products/types/create-product';
import KeyboardAwareWrapper from '~/components/keyboard-aware-wrapper';
import BasicHeader from '~/components/basic-header';

const EdittProduct = () => {
  const { id } = useLocalSearchParams();
  const [productDetail, setProductDetail] = useState({
    category: '',
    description: '',
    name: '',
    price: 0,
    quantity: 0,
  });

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

  useEffect(() => {
    if (product) {
      setProductDetail({
        name: product.name || '',
        category: product.category || '',
        description: product.description || '',
        price: product.price || 0,
        quantity: product.quantity || 0,
        // id: product.id || "",
      });
    }
  }, [product]);

  const handleInputChange = <K extends keyof ProductDetailType>(
    name: K,
    value: ProductDetailType[K]
  ) => {
    setProductDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <BasicHeader label="Edit Product" />
      <KeyboardAwareWrapper>
        <SafeAreaView
          edges={['top', 'bottom']}
          style={[styles.container, { paddingHorizontal: THEME.spacing.gutter }]}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <EditProductForm
              handleInputChange={handleInputChange}
              product={product}
              productDetail={productDetail}
              productId={id}
            />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAwareWrapper>
    </>
  );
};

export default EdittProduct;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  contentContainer: {
    // rowGap: THEME.spacing.xl,
    // flexGrow: 1,
    // paddingBottom: 10,
  },

  subtitle: {
    color: THEME.colors.neutral[300],
    marginTop: THEME.spacing.sm,
  },
  hairline: {
    height: 1,
    width: '30%',
    backgroundColor: THEME.colors.border,
  },
  alt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
    justifyContent: 'center',
  },
  link: {
    color: THEME.colors.primary,
    fontFamily: THEME.fontFamily.medium,
  },
});
