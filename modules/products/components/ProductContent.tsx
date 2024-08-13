<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
=======
import React, { useState } from 'react';
import { View, Text, Pressable, Animated, ScrollView, StyleSheet, Image } from 'react-native';
import { ChevronDown, Star } from 'react-native-feather';
import { useRotationAnimation } from '../hooks/animation';
import { formatCurrency, stateCityMapping } from '../constants';
import { TextInput } from '~/components/shared';
import { ProductContentProps } from '../types';

const ProductContent = ({ data }: ProductContentProps) => {
  const { images } = data;
  const [street, setStreet] = useState<string>('');
  const { rotateIcon, rotate, isRotated } = useRotationAnimation();
  const [selectedState, setSelectedState] = useState<string>('Select State');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    images.length > 0 ? images[0] : null
  );

  const quantity = 20;

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };
  const maxRating = 2000; // Example maximum rating
  const review = 1500; // Example review rating
  const normalizedReview = (review / maxRating) * 5;

  const rating = Array(5)
    .fill(0)
    .map((_, i) => {
      if (i < Math.floor(normalizedReview)) {
        return 1;
      } else if (i < normalizedReview) {
        return 0.5;
      } else {
        return 0;
      }
    });

  const displayRating = () => {
    if (review < 500) {
      return '(2.5)';
    } else if (review < 1000) {
      return '(3.0)';
    } else if (review < 1500) {
      return '(3.5)';
    } else if (review < 2000) {
      return '(4.0)';
    } else if (review < 2500) {
      return '(4.5)';
    } else {
      return '(5.0)';
    }
  };

  const description =
    'A fusion of ripe bananas, pure honey, and succulent raspberries with our bread. Crafted to perfection.';
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

  const selectedAddress = getSelectedAddress();
  // console.log(selectedAddress);
>>>>>>> 9508895 (implement product details ui and update related components)

  return (
<<<<<<< HEAD
    <View>
      <Text>ProductContent</Text>
=======
import { Image, StyleSheet } from 'react-native';
=======
import { StyleSheet, Text, View } from 'react-native';
>>>>>>> fc6b8d1 (Add product details feature)
import React from 'react';

const ProductContent = () => {
  return (
    <View>
<<<<<<< HEAD
      <View style={[styles.contentContainer, { borderTopWidth: 1 }]}>
        <View style={styles.imageContainer}>
          <Image source={data.images[0]} style={styles.productImage} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.rowGap}>
            <Text style={styles.productName}>{data.name}</Text>
            <Text style={styles.productPrice}>{formatCurrency(data.price)}</Text>
          </View>
          <Text style={styles.productId}>{data.productId}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={[styles.columnContainer, { gap: 16 }]}>
          <View style={styles.rowGap}>
            <View style={styles.columnContainer}>
              <Text style={styles.labelText}>Category</Text>
              <Text style={styles.itemText}>{data.category}</Text>
            </View>
            <View style={styles.columnContainer}>
              <Text style={styles.labelText}>Stock</Text>
              <Text style={styles.itemText}>{data.stock}pcs</Text>
            </View>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.labelText}>Date added</Text>
            <Text style={styles.itemText}>
              {data.dateTime.date}, {data.dateTime.time}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.descriptionContentBox}>
          <View>
            <Text style={styles.descriptionLabel}>Description</Text>
          </View>
          <View style={styles.descriptionContainer}>
=======
    <View style={styles.container}>
      <View style={styles.imageDisplayContainer}>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image source={selectedImage} style={styles.largeImage} />
          ) : (
            <Text style={styles.placeholderText}>No Image Available</Text>
          )}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rowContainerJb}>
          <View style={[styles.columnContainer, { alignItems: 'flex-start' }]}>
            <Text style={styles.productName}>Product 01</Text>
            <Text style={styles.productUniqueId}>P002</Text>
          </View>
          <View style={[styles.columnContainer, { alignItems: 'flex-end' }]}>
            <Text style={styles.productPrice}>{formatCurrency(20)}</Text>
            <View style={styles.rowGap3}>
              <View
                style={
                  quantity > 0
                    ? [styles.stockCircle, { backgroundColor: 'green' }]
                    : [styles.stockCircle, { backgroundColor: 'red' }]
                }
              />
              <Text style={styles.stockText}>in stock</Text>
            </View>
          </View>
        </View>
        <View style={styles.rgap6}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {rating.map(
              (value, index) =>
                value > 0 && (
                  <Star
                    key={index}
                    width={16}
                    height={16}
                    strokeWidth={0}
                    fill={value === 1 ? '#F6B01D' : '#E0E0E0'}
                  />
                )
            )}
            <Text style={styles.reviewText}>{displayRating()}</Text>
          </View>
          <Pressable>
            <Text style={styles.linkText}>See reviews</Text>
          </Pressable>
        </View>
      </View>
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
                    <Image source={image} style={styles.thumbnailImage} />
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noImagesText}>No images to display</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.descriptionInfoContainer}>
        <View style={styles.descriptionContainer}>
          <Text>Description</Text>
          <View>
>>>>>>> 9508895 (implement product details ui and update related components)
            <Text style={styles.descriptionText}>{data.description}</Text>
          </View>
        </View>
      </View>
<<<<<<< HEAD
>>>>>>> 36f173b (Add product details ui screen implementation)
=======
      <Text>ProductContent</Text>
>>>>>>> fc6b8d1 (Add product details feature)
=======
      <View style={styles.dropDownContainer}>
        <View style={styles.rowContainerJb}>
          <Text style={styles.dropDownLabel}>Product Ratings and Reviews</Text>
          <Pressable style={styles.dropdownIcon}>
            <ChevronDown width={18} height={18} stroke={'black'} />
          </Pressable>
        </View>
      </View>
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
>>>>>>> 9508895 (implement product details ui and update related components)
    </View>
  );
};

export default ProductContent;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const styles = StyleSheet.create({});
=======
const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    paddingVertical: 24,
    paddingHorizontal: 24,
=======
const styles = StyleSheet.create({
  container: {},
  imageDisplayContainer: {
    padding: 24,
    borderTopWidth: 1,
>>>>>>> 9508895 (implement product details ui and update related components)
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  imageContainer: {
<<<<<<< HEAD
    width: '100%',
    height: 162,
    borderRadius: 6,
    overflow: 'hidden',
  },
  productName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
  productId: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  descriptionContentBox: {
=======
    height: 162,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 6,
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
>>>>>>> 9508895 (implement product details ui and update related components)
    flexDirection: 'column',
    gap: 10,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
<<<<<<< HEAD
  productPrice: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
  rowGap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionLabel: {
    fontFamily: 'Inter_600SemiBold',
  },
  descriptionContainer: {},
=======
>>>>>>> 9508895 (implement product details ui and update related components)
  descriptionText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
<<<<<<< HEAD
  },
  columnContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  labelText: {
    color: '#525252',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#000',
  },
});
>>>>>>> 36f173b (Add product details ui screen implementation)
=======
const styles = StyleSheet.create({});
>>>>>>> fc6b8d1 (Add product details feature)
=======
    color: '#71717A',
  },
  descriptionLabel: {
    fontFamily: 'Inter_600SemiBold',
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
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#71717A',
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
  },
  noImagesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  // Text Handling

  productName: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Inter_600SemiBold',
  },
  productUniqueId: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#0A0A0A',
  },
  productPrice: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Inter_600SemiBold',
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
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#525252',
  },
  // variation label text
  variationLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#525252',
  },
});
>>>>>>> 9508895 (implement product details ui and update related components)
