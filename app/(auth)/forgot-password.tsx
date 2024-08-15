import { Link, router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '~/components/go-back';
import { Button, Text, View } from '~/components/shared';
import { FormInput } from '~/components/wrappers';
import { THEME } from '~/constants/theme';

const ForgotPassword = () => {
  const { control } = useForm();

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

        <View style={styles.formContainer}>
          <FormInput
            label="Email"
            control={control}
            name="email"
            placeholder="Enter your email"
            rules={{ required: true, email: true }}
            errorMessage="This email doesn't match our records please try again"
          />

          <View>
            <Button children="Send" onPress={handleForgotPassword} />

            <View style={styles.footer}>
              <Text>Remember your password?</Text>
              <Link style={styles.link} href="/login">
                Login
              </Link>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  async function handleForgotPassword() {
    // TODO: Implement forgot password functionality
    router.push('/otp-verfication');
  }
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
  formContainer: {
    rowGap: THEME.spacing.xl,
  },
  footerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: THEME.spacing.xs,
  },

  footer: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
    justifyContent: 'center',
    marginTop: THEME.spacing.lg,
  },
  link: {
    color: THEME.colors.primary,
    fontFamily: THEME.fontFamily.medium,
  },
  footnoteContainer: { paddingHorizontal: THEME.spacing.gutter, marginTop: 24 },
  footnote: {
    color: THEME.colors.neutral[300],
    textAlign: 'center',
  },
});

export default ForgotPassword;
