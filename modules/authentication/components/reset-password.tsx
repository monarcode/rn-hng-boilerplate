import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { ResetPasswordFormSchema } from '../types/reset-password';
import { resetPasswordFormSchema } from '../validation-schema/reset-password';

import { Button } from '~/components/shared';
import { FormPasswordInput } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { AuthService } from '~/services/authentication';

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const onPasswordReset = async (data: ResetPasswordFormSchema) => {
    setLoading(true);
    try {
      const response = await AuthService.changeUserPassword(data);

      if (response) {
        Toast.show({
          type: 'success',
          props: {
            title: 'Success',
            description: 'Your password has been successfully changed',
          },
        });
        router.push('/(auth)/login');
      }

      return response;
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
      <FormPasswordInput
        control={form.control}
        name="new_password"
        label="New Password"
        placeholder="Enter new password"
      />

      <FormPasswordInput
        control={form.control}
        name="confirm_new_password"
        label="Confirm New Password"
        placeholder="Cofirm new password"
      />

      <View style={{ marginTop: 16 }}>
        <Button onPress={form.handleSubmit(onPasswordReset)} loading={loading}>
          Reset password
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    rowGap: THEME.spacing.lg,
  },
});

export default ResetPasswordForm;
