import { router } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '~/components/go-back';
import { Button, Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

export default function VerificationSuccess() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <GoBack />

      <View style={styles.wrapper}>
        <View>
          <Text size="3xl" weight="semiBold" style={styles.title}>
            Verification Successful
          </Text>
          <Text size="md" weight="regular" style={styles.desc}>
            Your verification was successful, you can now proceed to reset your password
          </Text>
        </View>

        <View>
          <Button children="Continue to login" onPress={handleContinueLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function handleContinueLogin() {
  // TODO: Implement navigation to login screen
  router.navigate('/login');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: THEME.colors.white,
    paddingHorizontal: THEME.spacing.gutter,
  },
  wrapper: {
    marginTop: 28,
    rowGap: THEME.spacing.xl,
  },
  title: {
    textAlign: 'center',
    color: THEME.colors.dark,
    marginBottom: THEME.spacing.sm,
  },
  desc: {
    lineHeight: 18,
    textAlign: 'center',
    color: THEME.colors.neutral[300],
  },
});
