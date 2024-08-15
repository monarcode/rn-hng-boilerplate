import { StyleSheet } from 'react-native';

import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { useProducts } from '~/hooks/products/organization/fetchProducts';
import useAuthStore from '~/store/auth';

const ViewProductsByCategory = () => {
  const authstore = useAuthStore();
  const orgId = authstore.data?.organisations[0].organisation_id;
  const { categoryId } = useLocalSearchParams();
  const { data } = useProducts(orgId);
  const category = data?.find((item) => item.name == categoryId);

  return (
    <View style={styles.container}>
      <Text>ViewProductsByCategory</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.gutter,
    backgroundColor: THEME.colors.white,
  },
});

export default ViewProductsByCategory;
