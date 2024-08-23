import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack } from 'expo-router';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import BasicHeader from '~/components/basic-header';
import KeyboardWrapper from '~/components/keyboard-behaviour-wrapper';
import { Button, Text, View } from '~/components/shared';
import { FormPasswordInput } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { useAccountSettings } from '~/hooks/auth/account-settings';
import { ChangePasswordSchema } from '~/modules/settings/types/change-password';
import { changePasswordSchema } from '~/modules/settings/validation-schema/change-password';

const ChangePassword = () => {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });
  const { updateUserPasswordMutation } = useAccountSettings();

  const onSubmitPasswordChange = async (data: ChangePasswordSchema) => {
    console.log(data);
    try {
      await updateUserPasswordMutation.mutateAsync(data);
      Toast.show({
        type: 'success',
        props: {
          title: 'Success',
          description: 'Password updated successfully',
        },
      });
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          props: {
            title: 'Error',
            description: error.message,
          },
        });
      }
    }
  };

  return (
    <KeyboardWrapper>
      <Stack.Screen
        options={{
          header: () => <BasicHeader label="Password Setting" />,
        }}
      />

      <View style={styles.container}>
        <Text size="sm">Update password for enhanced account security</Text>

        <View style={styles.content}>
          <FormPasswordInput
            control={form.control}
            name="old_password"
            label="Current Password"
            placeholder="Enter current password"
          />
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
            placeholder="Confirm new password"
          />

          <View style={styles.action}>
            <Button variant="secondary" containerStyle={{ flex: 1 }} onPress={router.back}>
              Cancel
            </Button>

            <Button
              containerStyle={{ flex: 1 }}
              onPress={form.handleSubmit(onSubmitPasswordChange)}
              loading={updateUserPasswordMutation.isPending}>
              Update Password
            </Button>
          </View>
        </View>
      </View>
    </KeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.spacing.gutter,
    paddingTop: THEME.spacing.sm,
  },
  content: {
    rowGap: THEME.spacing.xl,
    marginTop: THEME.spacing.md,
  },
  action: {
    flexDirection: 'row',
    columnGap: THEME.spacing.md,
  },
});

export default ChangePassword;
