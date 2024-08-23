import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet } from 'react-native';
import { Plus, X } from 'react-native-feather';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import Dollar from '../../../assets/dollar.svg';
import { CreateProductSchema, ProductDetailType } from '../types/create-product';
import { createProductSchema } from '../validation-schema/create-product';

import { Button, Select, Text, TextInput, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import { ProductService } from '~/services/product';
import useAuthStore from '~/store/auth';

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
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({
    fileName: '',
    uri: '',
  });

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });
  const data = useAuthStore();
  const orgId = data.data?.organisations[0]?.organisation_id;

  const onEdit = async () => {
    setLoading(true);

    try {
      const response = await ProductService.editProduct(productDetail, productId as string);

      if (response) {
        Toast.show({
          type: 'success',
          props: {
            title: 'Success',
            description: 'Product edited successfully',
          },
        });
        form.reset();
        setImage({
          fileName: '',
          uri: '',
        });
        router.replace('/(tabs)/products');
      }
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          props: {
            title: 'Error',
            description: error.message,
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

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
          inputStyle={{ textAlign: 'left', textAlignVertical: 'top' }}
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
      {/* <FormSelect
        name="category"
        control={form.control}
        label="Category"
        options={[
          { label: 'Food', value: 'Food' },
          { label: 'Fashion', value: 'Fashion' },
          { label: 'Device', value: 'Device' },
          { label: 'Household Items', value: 'Household Items' },
        ]}
        placeholder="Select"
      /> */}
      <TextInput
        icon={<Dollar width={20} height={20} />}
        label="Standard Price"
        value={String(productDetail?.price)} // Convert price to string
        onChangeText={(value) => handleInputChange('price', Number(value))} // Convert back to number when changing
      />

      <TextInput
        label="Quantity"
        value={String(productDetail?.quantity)} // Convert quantity to string
        onChangeText={(value) => handleInputChange('quantity', Number(value))} // Convert back to number when changing
      />

      <View style={styles.buttonGroup}>
        <Button
          onPress={() => router.replace('/(tabs)/products')}
          variant="outline"
          containerStyle={styles.cancelButton}
          textStyle={styles.cancelButtonText}>
          Cancel
        </Button>
        <Button onPress={onEdit} containerStyle={styles.addButton} loading={loading}>
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

  label: {
    marginBottom: 5,
  },
  subtext: {
    marginTop: 5,
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
    height: 125,
    gap: 5,
    borderColor: '#ddd',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderStyle: 'dashed',
    overflow: 'hidden',
    marginTop: 10,
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
  cancelButton: {
    flex: 1,
    borderColor: THEME.colors.border,
    marginRight: 5,
  },
  cancelButtonText: {
    fontSize: THEME.fontSize.md,
    color: '#333',
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
