import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '~/components/go-back';
import KeyboardWrapper from '~/components/keyboard-behaviour-wrapper';
import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import OrganisationSignupForm from '~/modules/authentication/components/organisation-sign-up-form';

export default function OrganisationSignup() {
  return (
    <KeyboardWrapper>
      <SafeAreaView edges={['top', 'bottom']} style={[styles.container, { paddingHorizontal: 20 }]}>
        <GoBack />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text weight="semiBold" size="3xl" style={{ color: THEME.colors.dark }}>
              Sign up
            </Text>
            <Text style={styles.subtitle}>Create an account to get started with us</Text>
          </View>

          <OrganisationSignupForm />
        </ScrollView>
      </SafeAreaView>
    </KeyboardWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  contentContainer: {
    rowGap: THEME.spacing.xl,
    flexGrow: 1,
    paddingBottom: 40,
  },
  subtitle: {
    color: THEME.colors.neutral[300],
    marginTop: THEME.spacing.sm,
  },
});
