import { Stack } from 'expo-router';

const UserLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="change-password" options={{ headerShown: true }} />
      <Stack.Screen name="subscription" options={{ headerShown: true }} />
      <Stack.Screen name="notification" options={{ headerShown: true }} />
    </Stack>
  );
};
export default UserLayout;
