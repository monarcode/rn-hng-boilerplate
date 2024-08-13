import { zodResolver } from '@hookform/resolvers/zod';
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet } from 'react-native';
import { Check } from 'react-native-feather';
import Toast from 'react-native-toast-message';

import { SigninFormSchema } from '../types/sign-in';
import { signInFormSchema } from '../validation-schema/sign-in';

import { Button, Text, View } from '~/components/shared';
import { FormInput, FormPasswordInput } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { AuthService } from '~/services/authentication';
import useAuthStore from '~/store/auth';

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);

  const form = useForm<SigninFormSchema>({
    resolver: zodResolver(signInFormSchema),
  });
  const authstore = useAuthStore();

  const onSignIn = async (data: SigninFormSchema) => {
    setLoading(true);
    try {
      const response = await AuthService.loginUser(data);

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

      <View>
        <FormPasswordInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
        <View style={styles.row}>
          <View style={styles.rememberme}>
            <CheckboxPrimitive.Root
              style={[
                styles.checkbox,
                {
                  borderWidth: checked ? 0 : 1,
                },
              ]}
              checked={checked}
              onCheckedChange={setChecked}>
              <CheckboxPrimitive.Indicator style={styles.checked}>
                <Check width={10} height={10} color={THEME.colors.white} />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>

            <Pressable onPress={() => setChecked(!checked)}>
              <Text>Remember me</Text>
            </Pressable>
          </View>

          <Link href="/forgot-password" style={{ color: THEME.colors.primary, fontSize: 14 }}>
            Forgot password?
          </Link>
        </View>
      </View>

      <View style={styles.actions}>
        <Button onPress={form.handleSubmit(onSignIn)} loading={loading}>
          Login
        </Button>
        <Button variant="secondary" onPress={form.handleSubmit(onSignIn)}>
          Use magic link Instead
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    rowGap: THEME.spacing.lg,
  },
  actions: {
    rowGap: THEME.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: THEME.spacing.md,
  },
  rememberme: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.sm,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  checked: {
    height: 16,
    borderRadius: 4,
    aspectRatio: 1,
    backgroundColor: THEME.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInForm;
