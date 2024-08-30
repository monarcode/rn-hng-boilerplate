import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Checkmark from '~/assets/icons/checkmark.svg';
import BasicHeader from '~/components/basic-header';
import KeyboardAwareWrapper from '~/components/keyboard-aware-wrapper';
import { Button, Text, View } from '~/components/shared';
import { FormPasswordInput } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { useAccountSettings } from '~/hooks/auth/account-settings';
import { ChangePasswordSchema } from '~/modules/settings/types/change-password';
import { changePasswordSchema } from '~/modules/settings/validation-schema/change-password';

const ChangePassword = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom;
  const [passwordStrength, setPasswordStrength] = useState(0);
  const strengthBarWidth = useSharedValue(0);
  const strengthBarColor = useSharedValue(0);

  const { mutate: updateUserPassword, isPending } = useAccountSettings();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const newPassword = form.watch('new_password');

  const onSubmitPasswordChange = async (data: ChangePasswordSchema) => {
    updateUserPassword(
      {
        old_password: data.old_password,
        new_password: data.new_password,
        confirm_new_password: data.confirm_new_password,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    return Math.min(strength, 3);
  };

  useEffect(() => {
    if (newPassword) {
      const strength = calculatePasswordStrength(newPassword);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [newPassword]);

  useEffect(() => {
    strengthBarWidth.value = withTiming((passwordStrength / 3) * 100, { duration: 300 });
    strengthBarColor.value = withTiming(passwordStrength, { duration: 300 });
  }, [passwordStrength]);

  const getRequirementColor = (requirement: boolean) => {
    if (newPassword === '') return THEME.colors.neutral['300'];
    return requirement ? THEME.colors.success : THEME.colors.error;
  };

  const getStrengthDescription = () => {
    if (newPassword === '') return '';
    if (passwordStrength === 0) return 'Very weak password';
    if (passwordStrength === 1) return 'Weak password';
    if (passwordStrength === 2) return 'Good password';
    if (passwordStrength === 3) return 'Strong password';
    return '';
  };

  return (
    <KeyboardAwareWrapper>
      <Stack.Screen
        options={{
          header: () => <BasicHeader label={t('Password Setting')} />,
        }}
      />
      <View style={styles.container}>
        <Text size="sm" weight="regular">
          {t('Update password for enhanced account security')}
        </Text>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <FormPasswordInput
            name="old_password"
            label={t('Current Password')}
            control={form.control}
            placeholder={t('Enter current password')}
          />
          <FormPasswordInput
            name="new_password"
            label={t('New Password')}
            control={form.control}
            placeholder={t('Enter new password')}
            onChangeText={(password) => {
              calculatePasswordStrength(password);
            }}
          />
          {newPassword && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthIndicator}>
                {[1, 2, 3].map((index) => (
                  <View
                    key={index}
                    style={[
                      styles.strengthBar,
                      {
                        backgroundColor:
                          index <= passwordStrength
                            ? passwordStrength === 1
                              ? THEME.colors.error
                              : passwordStrength === 2
                                ? THEME.colors.apply
                                : THEME.colors.success
                            : THEME.colors.neutral['300'],
                        opacity: index <= passwordStrength ? 1 : 0.3,
                      },
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.strengthDescription}>
                {getStrengthDescription()}
                <Text style={styles.requirementTitle}>{t(' Must contain:')}</Text>
              </Text>

              <View style={styles.requirements}>
                {[
                  { test: /[A-Z]/.test(newPassword), text: t('At least 1 uppercase') },
                  { test: /[0-9]/.test(newPassword), text: t('At least 1 number') },
                  { test: newPassword.length >= 8, text: t('At least 8 characters') },
                ].map((req, index) => (
                  <View key={index} style={styles.requirementRow}>
                    <Checkmark color={getRequirementColor(req.test)} />
                    <Text style={[styles.requirement]}>{req.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          <FormPasswordInput
            name="confirm_new_password"
            label={t('Confirm New Password')}
            control={form.control}
            placeholder={t('Confirm new password')}
          />
          <View style={[styles.actions, { marginBottom: bottomInset }]}>
            <Button onPress={router.back} variant="secondary" containerStyle={{ flex: 1 }}>
              {t('Cancel')}
            </Button>
            <Button
              onPress={form.handleSubmit(onSubmitPasswordChange)}
              containerStyle={{ flex: 1 }}
              loading={isPending}
              disabled={isPending}>
              {t('Update Password')}
            </Button>
          </View>
        </ScrollView>
      </View>
    </KeyboardAwareWrapper>
  );
};
export default ChangePassword;

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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: THEME.spacing.sm + 4,
    rowGap: THEME.spacing.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: 'bold',
    marginLeft: THEME.spacing.md,
  },
  strengthIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 4,
  },
  strengthContainer: {
    marginTop: -THEME.spacing.lg,
    rowGap: THEME.spacing.md,
  },
  strengthBar: {
    borderRadius: 2,
    width: '32%',
  },
  strengthDescription: {
    fontSize: THEME.fontSize.sm,
    marginTop: THEME.spacing.xs,
    fontWeight: 'bold',
  },
  requirementTitle: {
    fontSize: THEME.fontSize.sm,
    marginTop: THEME.spacing.sm,
    marginBottom: THEME.spacing.xs,
    fontWeight: 'bold',
  },

  requirements: {
    rowGap: THEME.spacing.md,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  requirement: {
    fontSize: THEME.fontSize.sm,
    marginLeft: THEME.spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: THEME.spacing.sm + 4,
  },
});
