import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { forgotpasswordSchema } from '../types/forgot-password';
import { forgotPasswordSchema } from '../validation-schema/forgot-password';

import { Button, Text, View } from '~/components/shared';
import { FormInput } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { AuthService } from '~/services/authentication';

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<forgotpasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async ({ email }: forgotpasswordSchema) => {
    setLoading(true);
    try {
      const response = await AuthService.forgotPassword(email);

      if (response) {
        Toast.show({
          type: 'success',
          props: {
            title: 'Success',
            description: 'A verification code has been sent to your email',
          },
        });
        router.navigate(`/${email}`);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          props: {
            title: 'Error',
            description: error.message,
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <FormInput
        control={form.control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        autoCapitalize="none"
      />

      <View>
        <Button onPress={form.handleSubmit(handleForgotPassword)} loading={loading}>
          Send
        </Button>

        <View style={styles.footer}>
          <Text>Remember your password?</Text>
          <Link style={styles.link} href="/(auth)/login">
            Login
          </Link>
        </View>
      </View>
    </View>
  );
};
export default ForgotPasswordForm;

const styles = StyleSheet.create({
  wrapper: {
    rowGap: THEME.spacing.lg,
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
});
