import { router } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ListRenderItem,
  Pressable,
  Dimensions,
} from 'react-native';
import { Search } from 'react-native-feather';

import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

const { width } = Dimensions.get('window');

type Order = {
  id: string;
  orderNumber: string;
  date: string;
  estimatedDate: string;
  isDelivered: boolean;
  productImage: any;
};

const OrdersList: React.FC = () => {
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: '99012',
      date: '20-Aug-2024  7:41PM',
      estimatedDate: '26th Aug',
      isDelivered: false,
      productImage: require('~/assets/product.png'),
    },
    {
      id: '2',
      orderNumber: '99013',
      date: '21-Aug-2024  3:22PM',
      estimatedDate: '27th Aug',
      isDelivered: false,
      productImage: require('~/assets/product-three.png'),
    },
    {
      id: '3',
      orderNumber: '99014',
      date: '22-Aug-2024  1:12PM',
      estimatedDate: '30th Aug',
      isDelivered: true,
      productImage: require('~/assets/product-two.png'),
    },
  ];

  const renderOrderItem: ListRenderItem<Order> = ({ item }) => (
    <Pressable
      onPress={() => {
        router.push(`/(tabs)/orders/${item.id}`);
      }}
      style={styles.orderCard}>
      <View style={styles.orderInfo}>
        <Text weight="bold" style={styles.orderNumber}>
          Order#: {item.orderNumber}
        </Text>
        <Text style={styles.orderDate}> {item.date} </Text>
        <View style={styles.deliveryInfo}>
          <Image source={require('~/assets/delivery-icon.png')} style={styles.deliveryIcon} />
          <Text
            weight="medium"
            style={[
              styles.deliveryText,
              { color: item.isDelivered ? THEME.colors.red : THEME.colors.green },
            ]}>
            {item.isDelivered
              ? `Delivered on ${item.estimatedDate}`
              : `Estimated Delivery on ${item.estimatedDate}`}
          </Text>
        </View>
      </View>
      <View style={styles.productImageStyle}>
        <Image source={item.productImage} style={styles.productImage} />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.orderStyle}>
          <Text size="2xl" weight="bold">
            Orders
          </Text>
        </View>
        <TouchableOpacity
          style={styles.searchStyle}
          onPress={() => {
            /* menu logic */
          }}>
          <Search width={24} height={24} color={THEME.colors.neutral[400]} />
        </TouchableOpacity>
      </View>

      <View style={styles.orderItem}>
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 20,
    marginTop: 40,
  },
  orderStyle: {
    marginLeft: 10,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
  orderInfo: {
    flex: 1,
    marginRight: 10,
  },
  orderNumber: {
    fontSize: width < 350 ? 14 : 16,
    color: '#71717a',
  },
  orderDate: {
    fontSize: width < 350 ? 12 : 14,
    color: '#71717a',
    marginTop: 5,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
  },
  deliveryIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  deliveryText: {
    fontSize: width < 350 ? 12 : 14,
    flexShrink: 1,
  },
  productImage: {
    width: width < 350 ? 70 : 90,
    height: width < 350 ? 60 : 80,
    resizeMode: 'contain',
  },
  productImageStyle: {
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    borderRadius: 10,
    padding: 2,
  },
  orderItem: {
    padding: THEME.spacing.md,
  },
  searchStyle: {
    marginRight: THEME.spacing.md,
  },
});

export default OrdersList;
