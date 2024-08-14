import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Platform, Pressable, TextInput } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '~/components/go-back';
import { Button, Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import Timer from '~/modules/authentication/components/timer';

const CELL_COUNT = 6;

interface RenderCellParams {
  index: number;
  symbol: string | undefined;
  isFocused: boolean;
}

interface UseBlurOnFulfillParams {
  value: string;
  cellCount: number;
}

interface UseClearByFocusCellParams {
  value: string;
  setValue: (value: string) => void;
}

const OtpVerfication: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [expired, setExpired] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);

  const codeRef = useBlurOnFulfill({
    value: code,
    cellCount: CELL_COUNT,
  } as UseBlurOnFulfillParams);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  } as UseClearByFocusCellParams);

  useEffect(() => {
    if (code.length === 6 && !expired) {
      // API call to verify OTP
      alert('otp verified');
    }
  }, [code]);

  const verifyCode = async () => {
    // API call to verify OTP
    if (code.length === 6 && !expired) {
      alert('otp verified');
      verifySignIn();
    } else {
      alert('Invalid OTP');
    }
  };

  const verifySignIn = async () => {
    // API call to verify and sign in
    if (code.length === 6 && !expired) {
      await verifyCode();
      alert('verified and signed in');
    } else {
      alert('Invalid OTP');
    }
  };

  const resetTimer = useCallback(() => {
    setMinutes(0);
    setSeconds(59);
  }, [0, 59]);

  const resendCode = async () => {
    // API call to resend OTP
    if (expired) {
      resetTimer();
    }
    console.log('otp resent');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <GoBack />

      <View style={styles.wrapper}>
        <View>
          <Text size="3xl" weight="semiBold" style={styles.title}>
            Verification Code
          </Text>
          <Text size="md" weight="regular" style={styles.desc}>
            Confirm the email sent to ellafedora@gmail and enter the verification code. Code expires
            in{' '}
            <Timer
              initialMinutes={minutes}
              initialSeconds={seconds}
              onExpire={() => setExpired(true)}
            />
          </Text>
        </View>

        <View style={{ rowGap: THEME.spacing.xl }}>
          <CodeField
            ref={codeRef}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            InputComponent={TextInput}
            textContentType="oneTimeCode"
            autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
            testID="my-code-input"
            renderCell={({ index, symbol, isFocused }: RenderCellParams) => (
              <View
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                <Text size="md" weight="medium" style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />

          <View>
            <Button children="Verify" onPress={handleVerification} />

            {expired && (
              <Text
                size="md"
                weight="medium"
                style={{
                  color: THEME.colors.error,
                  marginTop: THEME.spacing.md,
                  textAlign: 'center',
                }}>
                OTP expired
              </Text>
            )}

            <View style={styles.footer}>
              <Text>Didn't receive any code?</Text>
              <Pressable onPress={resendCode}>
                <Text size="md" weight="bold" style={{ color: THEME.colors.primary }}>
                  Resend OTP
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  async function handleVerification() {
    // TODO: Implement check verification code and contitnue to sign in or sign up
    router.replace('/verification-success');
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: THEME.colors.white,
    paddingHorizontal: THEME.spacing.gutter,
  },
  wrapper: {
    marginTop: 28,
    rowGap: THEME.spacing.xl,
  },
  title: {
    marginBottom: THEME.spacing.sm,
    color: THEME.colors.dark,
  },
  desc: {
    lineHeight: 18,
    color: THEME.colors.neutral[300],
  },
  cell: {
    width: 40,
    height: 40,
    borderRadius: 8,
    fontSize: THEME.fontSize.lg,
    borderWidth: 1.2,
    borderColor: THEME.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    textAlign: 'center',
    color: THEME.colors.neutral[300],
    fontSize: THEME.fontSize.lg,
    fontFamily: THEME.fontFamily.medium,
  },
  focusCell: {
    borderColor: THEME.colors.primary,
  },
  footer: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
    justifyContent: 'center',
    marginTop: THEME.spacing.lg,
  },
  link: {
    color: THEME.colors.primary,
    fontFamily: THEME.fontFamily.medium,
  },
});

export default OtpVerfication;
