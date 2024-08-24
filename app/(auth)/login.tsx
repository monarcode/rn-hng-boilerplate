import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoogleLogo from '~/assets/icons/google-icon.svg';
import KeyboardAwareWrapper from '~/components/keyboard-aware-wrapper';
import { Button, Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import SignInForm from '~/modules/authentication/components/sign-in-form';

const LoginScreen = () => {
  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.container, { paddingHorizontal: THEME.spacing.gutter }]}>
      <KeyboardAwareWrapper showsVerticalScrollIndicator={false}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text weight="semiBold" size="3xl" style={{ color: THEME.colors.dark }}>
              Login
            </Text>
            <Text style={styles.subtitle}>Welcome back, please enter your details</Text>

            <Button
              icon={<GoogleLogo />}
              containerStyle={{ marginVertical: THEME.spacing.lg }}
              variant="secondary">
              Sign in with Google
            </Button>

            <View style={styles.alt}>
              <View style={styles.hairline} />
              <Text>or continue with</Text>
              <View style={styles.hairline} />
            </View>
          </View>

          <SignInForm />

          <View style={styles.footer}>
            <Text>Don’t Have An Account?</Text>
            <Link style={styles.link} href="/sign-up">
              Sign Up
            </Link>
          </View>

          <View style={styles.footnoteContainer}>
            <Text size="sm" style={styles.footnote}>
              By logging in, you agree with our Terms & Use and Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAwareWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  contentContainer: {
    rowGap: THEME.spacing.xl,
    flexGrow: 1,
  },
  subtitle: {
    color: THEME.colors.neutral[300],
    marginTop: THEME.spacing.sm,
  },
  hairline: {
    height: 1,
    width: '30%',
    backgroundColor: THEME.colors.border,
  },
  alt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
    justifyContent: 'center',
  },
  link: {
    color: THEME.colors.primary,
    fontFamily: THEME.fontFamily.medium,
  },
  footnoteContainer: { paddingHorizontal: THEME.spacing.gutter, marginTop: 24 },
  footnote: {
    color: THEME.colors.neutral[300],
    textAlign: 'center',
  },
});

export default LoginScreen;
