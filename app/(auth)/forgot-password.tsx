import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Text, View } from '~/components/shared';
import { FormInput } from '~/components/wrappers';
import { THEME } from '~/constants/theme';

const ForgotPassword = () => {
  const { control } = useForm();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color={THEME.colors.dark} />
      </TouchableOpacity>

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

            <View style={styles.footerText}>
              <Text size="md" weight="regular" style={{ color: THEME.colors.neutral[300] }}>
                Remember your password?
              </Text>
              <Pressable>
                <Text size="md" weight="bold" style={{ color: THEME.colors.primary }}>
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  async function handleForgotPassword() {
    // TODO: Implement forgot password functionality
    router.push('/(auth)/otp-verfication');
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: THEME.spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: THEME.spacing.xs,
  },
});

export default ForgotPassword;
