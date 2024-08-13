import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter';
import { PortalHost } from '@rn-primitives/portal';
import { router, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { toastConfig } from '~/libs/toast-config';
import useAuthStore from '~/store/auth';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [fontLoaded, fontLoadError] = useFonts({
    Inter_900Black,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontLoadError]);

  if (!fontLoaded && !fontLoadError) {
    return null;
  }

  return (
    <>
      <Root />
    </>
  );
}

function Root() {
  const authStore = useAuthStore();

  useEffect(() => {
    if (authStore.status === 'authenticated') {
      router.replace('/');
    } else if (authStore.status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [authStore.status]);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
      <PortalHost />
    </>
  );
}
