import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet } from 'react-native';
import { X } from 'react-native-feather';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import Dollar from '../../../assets/dollar.svg';
import { CreateProductSchema } from '../types/create-product';
import { createProductSchema } from '../validation-schema/create-product';

import { Button, Text, View } from '~/components/shared';
import { FormInput, FormSelect } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import normalize from '~/libs/normalize';
import { queryClient } from '~/libs/query';
import { ProductService } from '~/services/product';
import useAuthStore from '~/store/auth';

const CreateProductForm = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState({
    fileName: '',
    uri: '',
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

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
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const { mutate: onCreate, isPending: isLoading } = useMutation({
    mutationFn: async (data: CreateProductSchema) => {
      if (!image.uri) {
        throw new Error('Product Image is required');
      }
      const reqBody = {
        ...data,
        image_url: image.uri,
        size: 'normal',
      };
      return ProductService.createProduct(reqBody, orgId as string);
    },
    onMutate: () => {
      setIsSubmitAttempted(true);
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        props: {
          title: t('Success'),
          description: t('Product created successfully'),
        },
      });
      form.reset();
      setImage({
        fileName: '',
        uri: '',
      });
      router.replace('/(tabs)/products');
      return queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'error',
        props: {
          title: t('Error'),
          description: error.message,
        },
      });
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.uploadContainer}>
        {image.uri && (
          <Image
            source={{ uri: image.uri }}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        )}
        {!image.uri && (
          <Button containerStyle={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadButtonText} weight="medium">
              {t('Upload New')}
            </Text>
          </Button>
        )}
        {!image.uri && <Text style={styles.subtext}>{t('Upload product image')}</Text>}
      </View>
      {!image.uri && isSubmitAttempted && (
        <Text style={styles.errorText}>{t('Product Image is required')}</Text>
      )}

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
            <X color="red" width={20} />
          </TouchableWithoutFeedback>
        </View>
      )}

      <FormInput
        control={form.control}
        name="name"
        label={t("Title")}
        placeholder={t("Product Name")}
        required
      />

      <FormSelect
        name="category"
        control={form.control}
        label={t("Category")}
        options={[
          { label: 'Food', value: 'Food' },
          { label: 'Fashion', value: 'Fashion' },
          { label: 'Device', value: 'Device' },
          { label: 'Household Items', value: 'Household Items' },
        ]}
        placeholder={t('Select product category')}
        required
      />
      <View>
        <FormInput
          control={form.control}
          name="description"
          label={t("Description")}
          placeholder={t("Product Description")}
          numberOfLines={4}
          multiline
          containerStyle={{ width: '100%', height: 80, alignItems: 'flex-start' }}
          textAlign="left"
        />
        <Text weight="light" size="sm" style={{ marginTop: 5 }}>
          {t('Maximum of 72 characters')}
        </Text>
      </View>

      <FormInput
        control={form.control}
        name="price"
        label={t("Standard Price")}
        placeholder="0.00"
        keyboardType="numeric"
        required
        icon={<Dollar width={20} height={20} />}
      />
      <FormInput
        control={form.control}
        name="quantity"
        keyboardType="numeric"
        label={t("Quantity")}
        placeholder="0.00 pcs"
        required
      />

      {/* <View>
        <Text style={styles.label} size="md">
          Product Variations
        </Text>
        <View style={styles.variationContainer}>
          {[...Array(4)].map((_, index) => (
            <TouchableWithoutFeedback style={styles.variationBox} key={index}>
              <Plus color="#71717A" width={18} />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View> */}

      <View style={styles.buttonGroup}>
        <Button
          disabled={isLoading}
          onPress={() => router.replace('/(tabs)/products')}
          variant="secondary"
          containerStyle={styles.addButton}>
          {t('Cancel')}
        </Button>
        <Button
          onPress={form.handleSubmit(onCreate)}
          containerStyle={styles.addButton}
          loading={isLoading}>
          {t('Add')}
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
    height: normalize(125),
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
  errorText: {
    color: THEME.colors.error,
    fontSize: THEME.fontSize.sm,
    marginTop: -20,
    fontFamily: THEME.fontFamily.regular,
  },
});

export default CreateProductForm;
