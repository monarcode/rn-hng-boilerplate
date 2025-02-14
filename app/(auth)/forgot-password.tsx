import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '~/components/go-back';
import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import ForgotPasswordForm from '~/modules/authentication/components/forgot-password-form';

const ForgotPassword = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <GoBack />

      <View style={styles.wrapper}>
        <View>
          <Text size="3xl" weight="semiBold" style={styles.title}>
            Forgot Password
          </Text>
          <Text size="md" weight="regular" style={styles.desc}>
            Enter the email address you used to create the account to receive instructions on how to
            reset your password
          </Text>
        </View>

        <ForgotPasswordForm />
      </View>
    </SafeAreaView>
  );
};

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
    marginBottom: THEME.spacing.sm,
    color: THEME.colors.dark,
  },
  desc: {
    lineHeight: 18,
    color: THEME.colors.neutral[300],
  },
});

export default ForgotPassword;
