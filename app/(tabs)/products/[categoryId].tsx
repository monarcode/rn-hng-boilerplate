import { StyleSheet, Pressable, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import { useLocalSearchParams } from 'expo-router';

import { useProducts } from '~/hooks/products/organization/fetchProducts';
import useAuthStore from '~/store/auth';
import ProductItemListTile from '~/components/product-list/product-item-list';
import { SearchAndFilter } from '~/components/product-list';
import { Plus } from 'react-native-feather';
import { router } from 'expo-router';
import GoBack from '~/components/go-back';

const ViewProductsByCategory = () => {
  const authstore = useAuthStore();
  const orgId = authstore.data?.organisations[0].organisation_id;
  const { categoryId } = useLocalSearchParams();
  const { data } = useProducts(orgId);
  const category = data?.find((item) => item.name === categoryId);
  // console.log(category);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <GoBack />
        <Text size="3xl" weight="bold">{category?.name}</Text>
        <TouchableOpacity
          onPress={() => { /* menu logic */ }}>
          <Image source={require('~/assets/menu.png')} />
        </TouchableOpacity>
      </View>
      <SearchAndFilter />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: THEME.spacing.md }}>
          <FlatList
            scrollEnabled={false}
            data={category?.products} 
            keyExtractor={(item) => item.id} 
            renderItem={({ item }) => (
              <ProductItemListTile
              {...item}
              />
            )}
            contentContainerStyle={{ gap: THEME.spacing.lg }}
          />
        </View>
      </ScrollView>
      <Pressable
        style={styles.floatingButton}
        onPress={() => {
          router.push('/(create-product)/create-product');
        }}>
        <Plus width={25} height={25} color={THEME.colors.white} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    flex: 1,
    gap: THEME.spacing.lg,
  },
  floatingButton: {
    position: 'absolute',
    borderRadius: 1000,
    height: 50,
    width: 50,
    backgroundColor: THEME.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    right: THEME.spacing.md,
    bottom: 10,
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
  itemListStyle: {
    padding: THEME.spacing.md,
  },
});

export default ViewProductsByCategory;
