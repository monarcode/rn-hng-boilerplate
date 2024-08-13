import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { SignupFormSchema } from '../types/sign-up';
import { signUpFormSchema } from '../validation-schema/sign-up';

import { Button, View } from '~/components/shared';
import { FormInput, FormPasswordInput } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { AuthService } from '~/services/authentication';
import useAuthStore from '~/store/auth';

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });
  const authstore = useAuthStore();

  const onSignIn = async (data: SignupFormSchema) => {
    setLoading(true);

    try {
      const response = await AuthService.createUser(data);

      if (response) {
        authstore.setData(response.data);
        authstore.setToken(response.access_token);
        authstore.setStatus('authenticated');

        Toast.show({
          type: 'success',
          props: {
            title: 'Success',
            description: 'User created successfully',
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
        name="first_name"
        label="First Name"
        placeholder="Enter your first name"
      />

      <FormInput
        control={form.control}
        name="last_name"
        label="Last Name"
        placeholder="Enter your last name"
      />

      <FormInput
        keyboardType="email-address"
        control={form.control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        autoCapitalize="none"
      />

      <FormPasswordInput
        control={form.control}
        name="password"
        label="Password"
        placeholder="Enter your password"
      />

      <Button onPress={form.handleSubmit(onSignIn)} loading={loading}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    rowGap: THEME.spacing.lg,
  },
});

export default SignUpForm;
