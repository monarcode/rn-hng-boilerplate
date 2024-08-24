import { Stack } from 'expo-router';

const ProductsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create-product" options={{ headerShown: true }} />
      <Stack.Screen name="[id]" options={{ headerShown: true }} />
    </Stack>
  );
};
export default ProductsLayout;
