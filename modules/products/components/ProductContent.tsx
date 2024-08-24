import React, { useState } from 'react';
import { Pressable, Animated, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { ChevronDown } from 'react-native-feather';
import { useRotationAnimation } from '../hooks/animation';
import {
  convertImageToArray,
  createUniqueId,
  formatCurrency,
  stateCityMapping,
} from '../constants';
import { TextInput, View, Text } from '~/components/shared';
import { CreateAddressSchema, ProductContentProps } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAddressSchema } from '../validation-schema/address';
import { currency } from '~/libs/currency';
import { THEME } from '~/constants/theme';

const { width } = Dimensions.get('screen');

const ProductContent = ({ data, title }: ProductContentProps) => {
  const images = convertImageToArray(data?.image);
  const [street, setStreet] = useState<string>('');
  const { rotateIcon, rotate, isRotated } = useRotationAnimation();
  const [selectedState, setSelectedState] = useState<string>('Select State');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    images.length > 0 ? images[0] : null
  );

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const states = Object.keys(stateCityMapping);
  const cities = selectedState !== 'Select State' ? stateCityMapping[selectedState] : [];

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setSelectedCity(null);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };
  const handleStreetChange = (text: string) => {
    setStreet(text);
  };

  const getSelectedAddress = () => {
    return {
      state: selectedState,
      city: selectedCity,
      street,
    };
  };

  const dataPrice = (price: number) => {
    if (price > 5000000) {
      return currency(price, { notation: 'compact' });
    } else {
      return currency(price, { notation: 'standard' });
    }
  };

  const form = useForm<CreateAddressSchema>({
    resolver: zodResolver(createAddressSchema),
  });
  const selectedAddress = getSelectedAddress();

  const uniqueId = createUniqueId(data?.name, data?.id);

  return (
    <View style={styles.container}>
      <View style={styles.imageDisplayContainer}>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.largeImage} />
          ) : (
            <Text style={styles.placeholderText}>No Image Available</Text>
          )}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rowContainerJb}>
          <View style={[styles.columnContainer, { alignItems: 'flex-start' }]}>
            <Text style={styles.productName}>{data?.name}</Text>
            <Text style={styles.productUniqueId}>{uniqueId}</Text>
          </View>
          <View style={[styles.columnContainer, { alignItems: 'flex-end' }]}>
            <Text style={styles.productPrice}>{dataPrice(data?.price)}</Text>
            <View style={styles.rowGap3}>
              {title === 'Organizational' && (
                <Text style={styles.quantityText}>{data?.quantity}</Text>
              )}
              {title === 'user' && (
                <View
                  style={
                    data?.quantity > 0
                      ? [styles.stockCircle, { backgroundColor: 'green' }]
                      : [styles.stockCircle, { backgroundColor: 'red' }]
                  }
                />
              )}
              <Text style={styles.stockText}>in stock</Text>
            </View>
          </View>
        </View>
      </View>
      {title === 'user' && (
        <View style={styles.variationInfoContainer}>
          <View style={styles.variationColumnContainer}>
            <Text style={styles.variationLabel}>Variation</Text>
            <View style={styles.variationContainer}>
              {images.length > 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.thumbnailContainer}>
                  {images.map((image, index) => (
                    <Pressable
                      key={index}
                      onPress={() => handleImageSelect(image)}
                      style={[
                        styles.variationImageContainer,
                        {
                          borderColor: selectedImage === image ? '#F68C1E' : '#DEDEDE', // Change border color if selected
                          borderWidth: selectedImage === image ? 2 : 1, // Change border width if selected
                        },
                      ]}>
                      <Image
                        source={{ uri: image }}
                        style={[
                          styles.thumbnailImage,
                          {
                            width: selectedImage === image ? '80%' : '100%',
                            height: selectedImage === image ? '80%' : '100%',
                            borderRadius: selectedImage === image ? 5 : 0,
                          },
                        ]}
                      />
                    </Pressable>
                  ))}
                </ScrollView>
              ) : (
                <Text style={styles.noImagesText}>No images to display</Text>
              )}
            </View>
          </View>
        </View>
      )}
      <View style={styles.descriptionInfoContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Description</Text>
          <View>
            <Text style={styles.descriptionText}>{data?.description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.dropDownContainer}>
        <View style={styles.rowContainerJb}>
          <Text style={styles.dropDownLabel}>Product Ratings and Reviews</Text>
          <Pressable style={styles.dropdownIcon}>
            <ChevronDown width={18} height={18} stroke={'black'} />
          </Pressable>
        </View>
      </View>
      {title === 'user' && (
        <View style={styles.dropDownContainer}>
          <View style={styles.rowContainerJb}>
            <Text style={styles.dropDownLabel}>Delivery Address</Text>
            <Pressable style={styles.dropdownIcon} onPress={rotateIcon}>
              <Animated.View style={{ transform: [{ rotate }] }}>
                <ChevronDown width={18} height={18} stroke={'black'} />
              </Animated.View>
            </Pressable>
          </View>
          {isRotated && (
            <View style={styles.dropDownContentContainer}>
              <View style={styles.columGap16}>
                <View style={styles.dropDownItemContainer}>
                  <View style={styles.rowContainerJb}>
                    <Text style={styles.dropDownLabel}>{selectedState}</Text>
                    <Pressable style={styles.dropdownIcon} onPress={rotateIcon}>
                      <ChevronDown width={18} height={18} stroke={'black'} />
                    </Pressable>
                  </View>
                  <ScrollView>
                    {states.map((state, index) => (
                      <Pressable
                        key={index}
                        onPress={() => handleStateSelect(state)}
                        style={styles.optionContainer}>
                        <Text style={styles.stateOption}>{state}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>

                {selectedState !== 'Select State' && cities.length > 0 && (
                  <View style={styles.dropDownItemContainer}>
                    <View style={styles.rowContainerJb}>
                      <Text style={styles.dropDownLabel}>{selectedCity || 'Select City'}</Text>
                      <Pressable style={styles.dropdownIcon} onPress={rotateIcon}>
                        <ChevronDown width={18} height={18} stroke={'black'} />
                      </Pressable>
                    </View>
                    <ScrollView>
                      {cities.map((city, index) => (
                        <Pressable
                          key={index}
                          onPress={() => handleCitySelect(city)}
                          style={styles.optionContainer}>
                          <Text style={styles.stateOption}>{city}</Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                )}
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Input Street"
                    value={street}
                    onChangeText={handleStreetChange}
                    style={styles.textInput}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ProductContent;

const styles = StyleSheet.create({
  container: {},
  imageDisplayContainer: {
    padding: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  imageContainer: {
    height: 162,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 6,
  },
  quantityText: {
    fontSize: THEME.fontSize.md,
    color: THEME.colors.neutral[400],
    fontFamily: THEME.fontFamily.bold,
  },
  // Product info
  infoContainer: {
    flexDirection: 'column',
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  columnContainer: {
    flexDirection: 'column',
    gap: 6,
  },
  rowContainerJb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rgap6: {
    flexDirection: 'row',
    gap: 6,
  },
  reviewText: {},
  linkText: {
    color: '#F97316',
    fontFamily: 'Inter_400Regular',
  },
  // VariationContainer
  variationInfoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  variationColumnContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  variationContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  variationImageContainer: {
    width: 60,
    height: 42,

    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  // DescriptionContainer
  descriptionInfoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  descriptionContainer: {
    flexDirection: 'column',
    gap: 10,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  descriptionText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 14,
    fontFamily: THEME.fontFamily.regular,
    color: THEME.colors.neutral[400],
  },
  descriptionLabel: {
    fontFamily: THEME.fontFamily.semiBold,
    color: THEME.colors.black,
    fontSize: THEME.fontSize.lg,
  },
  //dropDownContainer
  dropDownContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  dropdownIcon: {},
  dropDownLabel: {
    fontFamily: THEME.fontFamily.regular,
    fontSize: THEME.fontSize.md,
    color: THEME.colors.neutral[400],
  },
  // dropDownContentContainer
  dropDownContentContainer: {
    marginTop: 10,
  },
  dropDownItemContainer: {
    paddingHorizontal: 12,
    paddingVertical: 18,
  },
  columGap16: {
    gap: 16,
    flexDirection: 'column',
  },
  optionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  stateOption: {},
  textInput: {},
  inputContainer: {
    paddingBottom: 50,
    marginBottom: 50,
  },
  largeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  placeholderText: {
    fontSize: 18,
    color: '#888',
    fontFamily: 'Inter_400Regular',
  },
  thumbnailContainer: {
    gap: 10,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    resizeMode: 'stretch',
  },
  noImagesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  // Text Handling

  productName: {
    fontSize: THEME.fontSize['2xl'],
    color: '#000',
    fontFamily: 'Inter_600SemiBold',
  },
  productUniqueId: {
    fontFamily: 'Inter_400Regular',
    fontSize: THEME.fontSize.md,
    color: THEME.colors.dark,
  },
  productPrice: {
    fontSize: THEME.fontSize['2xl'],
    color: THEME.colors.dark,
    fontFamily: THEME.fontFamily.semiBold,
  },
  // stock circle
  stockCircle: {
    width: 11,
    height: 11,
    borderRadius: 11 / 2,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  rowGap3: {
    gap: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: {
    fontFamily: 'Inter_400Regular',
    fontSize: THEME.fontSize.md,
    textTransform: 'capitalize',
    color: THEME.colors.neutral[400],
  },
  // variation label text
  variationLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#525252',
  },
});
