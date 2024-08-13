<<<<<<< HEAD
<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ProductContent = () => {
  return (
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
            <Text style={styles.descriptionText}>{data.description}</Text>
          </View>
        </View>
      </View>
>>>>>>> 36f173b (Add product details ui screen implementation)
=======
      <Text>ProductContent</Text>
>>>>>>> fc6b8d1 (Add product details feature)
    </View>
  );
};

export default ProductContent;

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
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  imageContainer: {
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
    flexDirection: 'column',
    gap: 10,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
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
  descriptionText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
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
