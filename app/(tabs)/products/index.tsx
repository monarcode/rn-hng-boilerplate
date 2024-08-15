import { Link, router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Button, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

const ProductsScreen = () => {
  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: '/products/[categoryId]',
          params: { categoryId: '1' },
        }}>
        Products Screen
      </Link>
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

export default ProductsScreen;
