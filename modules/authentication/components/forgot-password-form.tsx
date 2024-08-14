import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { forgotpasswordSchema } from '../types/forgot-password';
import { forgotPasswordSchema } from '../validation-schema/forgot-password';

import { Button, Text, View } from '~/components/shared';
import { FormInput } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { AuthService } from '~/services/authentication';
import useAuthStore from '~/store/auth';

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const authstore = useAuthStore();

  const form = useForm<forgotpasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onChangePassword = async (data: forgotpasswordSchema) => {
    setLoading(true);
    try {
      const response = await AuthService.changeUserPassword(data);

      if (response) {
        authstore.setData(response.data);
        authstore.setToken(response.access_token);
        authstore.setStatus('authenticated');

        Toast.show({
          type: 'success',
          props: {
            title: 'Success',
            description: `Welcome back ${response.data.user.first_name}`,
          },
        });

        router.replace('/');
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

      <View style={styles.actions}>
        <Button onPress={form.handleSubmit(onChangePassword)} loading={loading}>
          Login
        </Button>
      </View>
    </View>
  );
};
export default ForgotPasswordForm;

const styles = StyleSheet.create({
  wrapper: {
    rowGap: THEME.spacing.lg,
  },
  actions: {
    rowGap: THEME.spacing.sm,
  },
});
