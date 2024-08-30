import { Stack } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';

import BasicHeader from '~/components/basic-header';
import KeyboardAwareWrapper from '~/components/keyboard-aware-wrapper';
import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import OrganisationSignupForm from '~/modules/authentication/components/organisation-sign-up-form';

export default function OrganisationSignup() {
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen
        options={{
          header: () => <BasicHeader />,
        }}
      />
      <KeyboardAwareWrapper>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text weight="semiBold" size="3xl" style={{ color: THEME.colors.dark }}>
              {t('Create Organisation')}
            </Text>
            <Text style={styles.subtitle}>{t('Create an account to get started with us')}</Text>
          </View>

          <OrganisationSignupForm />
        </ScrollView>
      </KeyboardAwareWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.spacing.gutter,
  },
  contentContainer: {
    rowGap: THEME.spacing.xl,
    flexGrow: 1,
    paddingBottom: 40,
  },
  subtitle: {
    color: THEME.colors.neutral[300],
  },
});
