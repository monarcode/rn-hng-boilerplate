import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="organisation-sign-up" options={{ headerShown: true }} />
    </Stack>
  );
};
export default AuthLayout;
