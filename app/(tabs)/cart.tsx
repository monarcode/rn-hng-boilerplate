import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';

import Cancel from '~/assets/icons/cancel.svg';
import { Button, Text } from '~/components/shared';
import { THEME } from '~/constants/theme';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  const increaseQuantity = (itemId: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (itemId: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; price: number; quantity: number };
  }) => (
    <View style={styles.cartItem}>
      <Image source={require('~/assets/mycart.png')} style={styles.productImage} />

      <View style={styles.productDetails}>
        <View style={styles.nameIdContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productCode}>{item.id}</Text>
        </View>
        <View style={styles.priceQuantityContainer}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decreaseQuantity(item.id)}
              style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityNumber}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => increaseQuantity(item.id)}
              style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
        <Cancel width={12} height={24} />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'My Cart',
          headerTitleStyle: {
            fontSize: 20,
            color: THEME.colors.dark,
          },
          headerTitleAlign: 'left',
        }}
      />
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', marginTop: '20%' }}>
            <View style={{ width: 400, height: 200 }}>
              <Image
                resizeMode="contain"
                style={{ width: '100%', height: '100%' }}
                source={require('../../assets/images/emptyCart.png')}
              />
            </View>

            <Text size="md" weight="medium" style={{ marginTop: 30 }}>
              No products yet, please add product
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.bottomContainer}>
              <View style={styles.promoCodeContainer}>
                <TouchableOpacity style={styles.promoButton}>
                  <Text style={styles.promoCodeText}>Promo Code</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>Sub Total</Text>
                <Text style={styles.summaryText}>$38.00</Text>
              </View>
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>Delivery Fee</Text>
                <Text style={styles.summaryText}>$150.00</Text>
              </View>
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>Discount</Text>
                <Text style={styles.summaryText}>$10.00</Text>
              </View>
              <View style={styles.borderLine} />
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutText}>Checkout $198.00</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.spacing.gutter,
    backgroundColor: THEME.colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: THEME.colors.border,
    marginTop: 50,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: THEME.colors.border,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  nameIdContainer: {
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.colors.black,
  },
  productCode: {
    fontSize: 14,
    color: THEME.colors.dark,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: THEME.colors.black,
    marginTop: 20,
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: THEME.colors.primary,
    borderRadius: 5,
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  borderLine: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 10,
  },
  quantityText: {
    fontSize: 16,
    color: THEME.colors.primary,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  quantityNumber: {
    fontSize: 16,
    color: THEME.colors.black,
    textAlign: 'center',
    marginTop: 4,
  },
  removeButton: {
    padding: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  bottomContainer: {
    paddingVertical: 10,
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.white,
    marginBottom: 20,
  },
  promoCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    columnGap: 8,
  },
  promoCodeText: {
    fontSize: 16,
    color: THEME.colors.black,
  },
  applyButton: {
    backgroundColor: THEME.colors.apply,
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  promoButton: {
    backgroundColor: THEME.colors.white,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    borderColor: THEME.colors.border,
  },

  applyText: {
    color: THEME.colors.white,
    fontSize: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: THEME.colors.black,
  },
  checkoutButton: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutText: {
    color: THEME.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
