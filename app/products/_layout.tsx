import { Stack } from 'expo-router';

const ProductsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create-product" />
    </Stack>
  );
};

export default ProductsLayout;
