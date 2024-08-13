import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoogleLogo from '~/assets/icons/google-icon.svg';
import GoBack from '~/components/go-back';
import KeyboardWrapper from '~/components/keyboard-behaviour-wrapper';
import { Button, Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import SignUpForm from '~/modules/authentication/components/sign-up-form';

const SignUpScreen = () => {
  return (
    <KeyboardWrapper>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={[styles.container, { paddingHorizontal: THEME.spacing.gutter }]}>
        <GoBack />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text weight="semiBold" size="3xl" style={{ color: THEME.colors.dark }}>
              Sign Up
            </Text>
            <Text style={styles.subtitle}>Create an account to get started with us</Text>

            <Button
              icon={<GoogleLogo />}
              containerStyle={{ marginVertical: THEME.spacing.lg }}
              variant="secondary">
              Google
            </Button>

            <View style={styles.alt}>
              <View style={styles.hairline} />
              <Text>or continue with</Text>
              <View style={styles.hairline} />
            </View>
          </View>

          <SignUpForm />

          <View style={styles.footer}>
            <Text>Already Have An Account?</Text>
            <Link style={styles.link} href="/login">
              Login
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardWrapper>
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
});

export default SignUpScreen;
