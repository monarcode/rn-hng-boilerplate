import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import useAuthStore from '~/store/auth';

const HomeScreen = () => {
  const authstore = useAuthStore();

  return (
    <View style={styles.container}>
      <Link href="/sign-up">Home Screen</Link>
      <Pressable onPress={() => authstore.resetStore()}>
        <Text>Reset</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          Toast.show({
            type: 'error',
            props: {
              title: 'Success',
              description: 'This is a toast message',
            },
          })
        }>
        <Text>Toast</Text>
      </Pressable>
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

export default HomeScreen;
