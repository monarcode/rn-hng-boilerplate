import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Dollar from '../../../assets/dollar.svg';
import { Plus, X } from 'react-native-feather';

import { CreateProductSchema } from '../types/create-product';
import { createProductSchema } from '../validation-schema/create-product';

import { Button, Text, View } from '~/components/shared';
import { FormInput, FormSelect } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ProductService } from '~/services/product';
import useAuthStore from '~/store/auth';
import * as ImagePicker from 'expo-image-picker';

const CreateProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({
    fileName: '',
    uri: '',
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage({
        fileName: result.assets[0].fileName as string,
        uri: result?.assets[0].uri,
      });
    }
  };
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });
  const data = useAuthStore();
  const orgId = data.data?.organisations[0]?.organisation_id;

  const onCreate = async (data: CreateProductSchema) => {
    const reqBody = {
      ...data,
      image_url: image.uri,
      size: 'normal',
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
        setImage({
          fileName: '',
          uri: '',
        });
        router.replace('/(tabs)/products');
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
      <View>
        <View style={styles.uploadContainer}>
          {image.uri && (
            <Image
              source={{ uri: image.uri }}
              resizeMode="center"
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
          <Button containerStyle={styles.uploadButton} onPress={pickImage}>
            {!image.uri && (
              <Text style={styles.uploadButtonText} weight="medium">
                Upload New
              </Text>
            )}
          </Button>
          {!image.uri && <Text style={styles.subtext}>Upload product image</Text>}
        </View>
      </View>
      {image.fileName && (
        <View style={[styles.uploadButton, styles.nameCont]}>
          <Text style={styles.uploadButtonText} numberOfLines={1} ellipsizeMode="tail">
            {image.fileName}
          </Text>
          <TouchableWithoutFeedback
            onPress={() =>
              setImage({
                fileName: '',
                uri: '',
              })
            }>
            <X color={'red'} width={20} />
          </TouchableWithoutFeedback>
        </View>
      )}
      <FormInput control={form.control} name="name" label="Title" placeholder="Product Name" />
      <View>
        <FormInput
          control={form.control}
          name="description"
          label="Description"
          placeholder=""
          containerStyle={{ height: 80 }}
          style={{
            flex: 1,
          }}
          inputStyle={{ textAlign: 'left', textAlignVertical: 'top' }}
          multiline
        />
        <Text weight="light" size="sm">
          Maximum of 72 characters
        </Text>
      </View>
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

      <View style={styles.buttonGroup}>
        <Button
          onPress={() => router.replace('/(tabs)/products')}
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

export default CreateProductForm;
