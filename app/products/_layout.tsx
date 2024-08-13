import { Stack } from 'expo-router';

const ProductsLayout = () => {
  return (
  <Stack screenOptions={{ headerShown: false }} >
    <Stack.Screen name='categories' />
    <Stack.Screen name='[id]' />
  </Stack>);
};

export default ProductsLayout;
