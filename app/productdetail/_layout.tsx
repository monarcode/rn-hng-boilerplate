import { Stack } from 'expo-router';
import BasicHeader from '~/components/basic-header';

const ProductLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};
export default ProductLayout;
