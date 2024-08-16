import { Redirect, router, Stack } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell } from 'react-native-feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ellipse from '~/assets/icons/ellipse.svg';
import Chart from '~/components/home-screen-organisation/chart';
import Summary from '~/components/home-screen-organisation/summary';
import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import useAuthStore from '~/store/auth';
import useProfileStore from '~/store/profile';

const HomeScreen = () => {
  const authstore = useAuthStore();
  const profileData = useProfileStore((state) => state.data);
  const userData = useAuthStore((state) => state.data?.user);
  const { top } = useSafeAreaInsets();

  if (!authstore.data) {
    return <Redirect href="/(auth)/login" />;
  }
  const { first_name, avatar_url } = authstore.data?.user;
  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
          header(props) {
            return (
              <View
                style={{
                  width: '100%',
                  paddingTop: top,
                  paddingBottom: 4,
                  elevation: 1,
                  borderWidth: 1,
                  backgroundColor: THEME.colors.white,
                  borderColor: THEME.colors.borderLight,
                }}>
                <View style={styles.headerContainer}>
                  <View style={styles.headerLeft}>
                    <TouchableOpacity
                      style={styles.image}
                      activeOpacity={0.7}
                      onPress={() => router.navigate('/user-settings')}>
                      <View style={styles.profileImageContainer}>
                        {profileData?.avatar_url ? (
                          <Image
                            source={{ uri: `${profileData?.avatar_url}?${new Date().getTime()}` }}
                            style={styles.profileImage}
                          />
                        ) : (
                          <>
                            <Ellipse />
                            <View style={styles.initialsContainer}>
                              <Text size="xl" weight="medium">
                                {userData?.first_name[0]}
                                {userData?.last_name[0]}
                              </Text>
                            </View>
                          </>
                        )}
                      </View>
                    </TouchableOpacity>

                    <View style={styles.textRow}>
                      <Text size="md" weight="medium" style={styles.greetingText}>
                        Welcome back!
                      </Text>

                      <Text size="xl" weight="semiBold">
                        {profileData?.user_name || userData?.first_name}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <TouchableOpacity onPress={() => router.navigate('/user/notification')}>
                      <Bell color="black" />
                      <View style={styles.notification} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          },
        }}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: THEME.colors.white }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Summary />
          <Chart />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: THEME.spacing.gutter,
    paddingHorizontal: THEME.spacing.md,
    backgroundColor: THEME.colors.white,
    // gap: THEME.spacing.lg,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.md,
    gap: THEME.spacing.sm,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 50,
    overflow: 'hidden',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: THEME.spacing.sm,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 60,
    height: 60,
  },
  profileImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 40,
  },
  profileName: {
    marginBottom: 5,
  },
  initialsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRow: {
    rowGap: 2,
  },
  greetingText: {
    color: THEME.colors.neutral[300],
  },
  notification: {
    height: 12,
    width: 12,
    backgroundColor: 'red',
    position: 'absolute',
    right: 0,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 100,
  },
});

export default HomeScreen;
