import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import Dollar from '../../../assets/dollar.svg';
import { CreateProductSchema, ProductDetailType } from '../types/create-product';
import { createProductSchema } from '../validation-schema/create-product';

import { Button, Select, Text, TextInput, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import { ProductService } from '~/services/product';
import useAuthStore from '~/store/auth';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '~/libs/query';
import normalize from '~/libs/normalize';

interface Props {
  productDetail: {
    category: string;
    description: string;
    name: string;
    price: number;
    quantity: number;
  };
  product: any;
  handleInputChange: <K extends keyof ProductDetailType>(
    name: K,
    value: ProductDetailType[K]
  ) => void;
  productId: string;
}

const EditProductForm = ({ product, productDetail, handleInputChange, productId }: Props) => {
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });
  const data = useAuthStore();

  const { mutate: onEdit, isPending: isEditing } = useMutation({
    mutationFn: () => ProductService.editProduct(productDetail, productId as string),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        props: {
          title: 'Success',
          description: 'Product edited successfully',
        },
      });
      form.reset();

      router.replace('/(tabs)/products');
      return queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          props: {
            title: 'Error',
            description: error.message,
          },
        });
      }
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.uploadContainer}>
        {product.image && (
          <Image
            source={{ uri: product.image }}
            // resizeMode="center"
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
        )}
      </View>

      <TextInput
        label="Title"
        value={productDetail?.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />

      <View>
        <TextInput
          label="Description"
          value={productDetail?.description}
          onChangeText={(value) => handleInputChange('description', value)}
          containerStyle={{ height: 80 }}
          style={{
            flex: 1,
          }}
          inputStyle={{ textAlign: 'left', textAlignVertical: 'top', height: 75 }}
          multiline
        />
      </View>
      <Select
        options={[
          { label: 'Food', value: 'Food' },
          { label: 'Fashion', value: 'Fashion' },
          { label: 'Device', value: 'Device' },
          { label: 'Household Items', value: 'Household Items' },
        ]}
        placeholder={productDetail?.category}
        width={300}
        iconColor="#ccc"
      />

      <TextInput
        icon={<Dollar width={20} height={20} />}
        label="Standard Price"
        value={String(productDetail?.price)} // Convert price to string
        onChangeText={(value) => handleInputChange('price', value)} // Convert back to number when changing
      />

      <TextInput
        label="Quantity"
        value={String(productDetail?.quantity)} // Convert quantity to string
        onChangeText={(value) => handleInputChange('quantity', value)} // Convert back to number when changing
      />

      <View style={styles.buttonGroup}>
        <Button
          onPress={() => router.replace('/(tabs)/products')}
          variant="secondary"
          containerStyle={styles.addButton}>
          Cancel
        </Button>
        <Button onPress={onEdit} containerStyle={styles.addButton} loading={isEditing}>
          Update
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    rowGap: THEME.spacing.lg,
  },
  variationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  variationBox: {
    width: 73,
    height: 67,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderStyle: 'dashed',
    borderColor: THEME.colors.border,
  },
  uploadContainer: {
    borderWidth: 1,
    height: normalize(150),
    gap: 5,
    borderColor: '#ddd',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  uploadButton: {
    backgroundColor: THEME.colors.white,
    elevation: 3,
    shadowColor: '#ccc',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  uploadButtonText: {
    color: THEME.colors.black,
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THEME.spacing.sm,
  },

  addButton: {
    flex: 1,
    marginLeft: 5,
  },
  nameCont: {
    padding: THEME.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default EditProductForm;
