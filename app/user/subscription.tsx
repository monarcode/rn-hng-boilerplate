import { Stack } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GoBack from '~/components/go-back';
import { Text, View } from '~/components/shared';
import { plansData } from '~/components/subscription/plans';
import SubscriptionCard from '~/components/subscription/subscription-card';
import { THEME } from '~/constants/theme';

export default function Subscription() {
  const { top } = useSafeAreaInsets();

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
                  paddingBottom: 6,
                  elevation: 1,
                  borderWidth: 1,
                  backgroundColor: THEME.colors.white,
                  borderColor: THEME.colors.borderLight,
                }}>
                <View style={styles.headerContainer}>
                  <View style={styles.headerLeft}>
                    <GoBack />
                    <Text size="xl" weight="semiBold">
                      Subscription
                    </Text>
                  </View>
                </View>
              </View>
            );
          },
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={plansData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SubscriptionCard plan={item} />}
          contentContainerStyle={styles.wrapper}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.spacing.gutter,
    backgroundColor: THEME.colors.white,
  },
  wrapper: {
    paddingTop: 20,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: THEME.spacing.sm,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: THEME.spacing.sm,
    alignItems: 'center',
  },
});
