import React, { ReactNode, useState } from 'react';
import {
  TextInput as NativeTextInput,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Eye, EyeOff } from 'react-native-feather';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Text from './text';

import { THEME } from '~/constants/theme';

export interface PasswordInputProps {
  /**
   * Placeholder text for the password input.
   * @default 'Enter password'
   */
  placeholder?: string;
  /**
   * Current value of the password input.
   */
  value?: string;
  /**
   * Callback function to handle changes to the text input.
   */
  onChangeText?: (text: string) => void;
  /**
   * Icon to display on the left side of the input.
   */
  icon?: ReactNode;
  /**
   * Custom style for the outer container.
   */
  style?: ViewStyle;
  /**
   * Custom style for the container wrapping the input.
   */
  containerStyle?: ViewStyle;
  /**
   * Custom style for the input field.
   */
  inputStyle?: TextStyle;
  /**
   * Color of the border when the input is focused.
   * @default THEME.colors.primary
   */
  focusColor?: string;
  /**
   * Color of the border when the input is not focused.
   * @default THEME.colors.border
   */
  unfocusedColor?: string;
  /**
   * Label text to display above the input.
   */
  label?: string;
  onFocus?: () => void;
  /** Callback function called when the input loses focus */
  onBlur?: () => void;
}

/**
 * Custom Password input component with visibility toggle.
 *
 * @component
 * @example
 * ```tsx
 * <PasswordInput
 *   placeholder="Enter password"
 *   value={password}
 *   onChangeText={setPassword}
 *   focusColor="blue"
 *   unfocusedColor="grey"
 *   label="Password"
 * />
 * ```
 */
const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  onChangeText,
  icon,
  style,
  containerStyle,
  inputStyle,
  focusColor = THEME.colors.primary,
  unfocusedColor = THEME.colors.border,
  label,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const focusProgress = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(focusProgress.value, [0, 1], [unfocusedColor, focusColor]),
  }));

  const handleFocus = () => {
    focusProgress.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    focusProgress.value = withTiming(0, { duration: 200 });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.outerContainer, style]}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <Animated.View style={[styles.container, containerStyle, animatedContainerStyle]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <NativeTextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={THEME.colors.dark}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          {isPasswordVisible ? (
            <Eye width={16} height={16} color={THEME.colors.dark} />
          ) : (
            <EyeOff width={16} height={16} color={THEME.colors.dark} />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 6,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    height: 40,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: THEME.fontFamily.regular,
    marginBottom: 5,
  },
  eyeIconContainer: {
    padding: 5,
  },
});

export default PasswordInput;
