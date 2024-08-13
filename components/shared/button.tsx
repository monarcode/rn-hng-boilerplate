import React, { ReactNode, useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import Text from './text';
import View from './view';

import { THEME } from '~/constants/theme';

type ButtonVariant = 'primary' | 'outline' | 'secondary';

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: ButtonVariant;
  icon?: ReactNode;
}

/**
 * A custom Button component that wraps text in a pressable container, supports loading state and variants
 * @param {ButtonProps} props - The props for the Button component
 * @returns {JSX.Element} Rendered Button component
 *
 * @component
 * @example
 *
 * <Button onPress={() => console.log('Button pressed')} variant="primary" loading={false}>
 *   Primary Button
 * </Button>
 *
 * <Button onPress={() => console.log('Button pressed')} variant="outline" loading={true}>
 *   Outline Button
 * </Button>
 */
function Button({
  children,
  containerStyle,
  textStyle,
  loading = false,
  variant = 'primary',
  icon,
  ...others
}: ButtonProps): JSX.Element {
  const dynamicStyles = useMemo(() => {
    const container = [
      styles.container,
      variant === 'primary' && styles.primaryContainer,
      variant === 'outline' && styles.outlineContainer,
      variant === 'secondary' && styles.secondaryContainer,
      containerStyle,
    ];

    const text = [
      styles.text,
      variant === 'primary' && styles.primaryText,
      variant === 'outline' && styles.outlineText,
      variant === 'secondary' && styles.secondaryText,
      textStyle,
    ];

    return { container, text };
  }, [containerStyle, textStyle, variant]);

  return (
    <Pressable
      style={dynamicStyles.container}
      accessibilityRole="button"
      accessibilityState={{ disabled: loading }}
      disabled={loading}
      {...others}>
      {loading ? (
        <Animated.View entering={ZoomIn} exiting={ZoomOut}>
          <ActivityIndicator
            color={variant === 'primary' ? THEME.colors.white : THEME.colors.primary}
          />
        </Animated.View>
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={dynamicStyles.text}>{children}</Text>
        </>
      )}
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    paddingHorizontal: THEME.spacing.md,
    flexDirection: 'row',
    columnGap: THEME.spacing.md,
  },
  text: {},
  primaryContainer: {
    backgroundColor: THEME.colors.primary,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: THEME.colors.primary,
  },
  secondaryContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  primaryText: {
    color: THEME.colors.white,
  },
  outlineText: {
    color: THEME.colors.primary,
  },
  secondaryText: {
    color: THEME.colors.dark,
    fontFamily: THEME.fontFamily.medium,
  },
  iconContainer: {},
});
