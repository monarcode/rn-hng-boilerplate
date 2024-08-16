import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Dollar from '../../../assets/dollar.svg';
import { Plus } from 'react-native-feather';

import { CreateProductSchema } from '../types/create-product';
import { createProductSchema } from '../validation-schema/create-product';

import { Button, Text, View } from '~/components/shared';
import { FormInput, FormSelect } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ProductService } from '~/services/product';
import useAuthStore from '~/store/auth';

const CreateProductForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });
  const data = useAuthStore();
  const orgId = data.data?.organisations[0]?.organisation_id;

  const onCreate = async (data: CreateProductSchema) => {
    const reqBody = {
      products: [
        {
          ...data,
          image_url: '',
          size: '',
        },
      ],
    };
    setLoading(true);

    try {
      const response = await ProductService.createProduct(reqBody, orgId as string);

      if (response) {
        Toast.show({
          type: 'success',
          props: {
            title: 'Success',
            description: 'User created successfully',
          },
        });
        form.reset();
        // router.replace('/');
      }
    } catch (error) {
      console.log(error);
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
      <FormInput control={form.control} name="name" label="Title" placeholder="Product Name" />
      <FormInput
        control={form.control}
        name="description"
        label="Description"
        placeholder="Enter product description"
        containerStyle={{ height: 80, textAlign: 'left', textAlignVertical: 'top' }}
        style={{
          flex: 1,
        }}
        // inputStyle={{ textAlign: 'left', textAlignVertical: 'top' }}
        multiline
      />
      <FormSelect
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
      />

      <FormInput
        control={form.control}
        name="price"
        label="Standard Price"
        placeholder="0.00"
        icon={<Dollar width={20} height={20} />}
      />
      <FormInput control={form.control} name="quantity" label="Quantity" placeholder="0.00 pcs" />

      <View>
        <Text style={styles.label} size="md">
          Product Variations
        </Text>
        <View style={styles.variationContainer}>
          {[...Array(4)].map((_, index) => (
            <TouchableWithoutFeedback style={styles.variationBox} key={index}>
              <Plus color={'#71717A'} width={18} />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
      <View>
        <Text style={styles.label} size="md">
          Media
        </Text>
        <View style={styles.uploadContainer}>
          <Button containerStyle={styles.uploadButton}>
            <Text style={styles.uploadButtonText} weight="medium">
              Upload New
            </Text>
          </Button>
          <Text style={styles.subtext}>Accepts images, videos or 3D models</Text>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <Button
          variant="outline"
          containerStyle={styles.cancelButton}
          textStyle={styles.cancelButtonText}>
          Cancel
        </Button>
        <Button
          onPress={form.handleSubmit(onCreate)}
          containerStyle={styles.addButton}
          loading={loading}>
          Add
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
    borderColor: THEME.colors.border,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderStyle: 'dashed',
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
});

export default CreateProductForm;
