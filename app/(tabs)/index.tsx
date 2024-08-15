import { Link, Redirect } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Chart from '~/components/home-screen-organisation/chart';
import HomeHeader from '~/components/home-screen-organisation/home-header';
import Summary from '~/components/home-screen-organisation/summary';

import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import useAuthStore from '~/store/auth';

const HomeScreen = () => {
  const authstore = useAuthStore();
  console.log(authstore.token);

  const { first_name, avatar_url } = authstore.data?.user;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME.colors.white }}>
      <View style={styles.container}>
        <HomeHeader {...{ first_name, avatar_url }} />
        <Summary />
        <Chart />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: THEME.spacing.xl + 20,
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.gutter,
    backgroundColor: THEME.colors.white,
    gap: THEME.spacing.md,
  },
});

export default HomeScreen;
