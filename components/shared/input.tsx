import React, { ReactNode } from 'react';
import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Text from './text';

import { THEME } from '~/constants/theme';
import normalize from '~/libs/normalize';

/**
 * Props for the TextInput component.
 */
export interface TextInputProps extends NativeTextInputProps {
  /** Placeholder text for the input */
  placeholder?: string;
  /** Current value of the input */
  value?: string;
  /** Callback function called when the text changes */
  onChangeText?: (text: string) => void;
  /** Optional icon to display before the input */
  icon?: ReactNode;
  /** Style for the outer container */
  style?: ViewStyle;
  /** Style for the input container */
  containerStyle?: ViewStyle;
  /** Style for the text input itself */
  inputStyle?: TextStyle;
  /** Color of the border when the input is focused */
  focusColor?: string;
  /** Color of the border when the input is not focused */
  unfocusedColor?: string;
  /** Optional label text to display above the input */
  label?: string;
  /** Callback function called when the input is focused */
  onFocus?: () => void;
  /** Callback function called when the input loses focus */
  onBlur?: () => void;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder = '',
  value,
  onChangeText,
  icon,
  style,
  containerStyle,
  inputStyle,
  focusColor = THEME.colors.primary,
  unfocusedColor = THEME.colors.border,
  label,
  onFocus,
  onBlur,
  required = false,
  ...props
}) => {
  const focusProgress = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(focusProgress.value, [0, 1], [unfocusedColor, focusColor]);

    return {
      borderColor,
    };
  });

  const handleFocus = () => {
    focusProgress.value = withTiming(1, { duration: 300 });
    onFocus?.();
  };

  const handleBlur = () => {
    focusProgress.value = withTiming(0, { duration: 300 });
    onBlur?.();
  };

  return (
    <View style={[styles.outerContainer, style]}>
      {label && (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.inputLabel}>{label}</Text>
          {required && <Text style={{ color: '#f60000' }}>*</Text>}
        </View>
      )}
      <Animated.View style={[styles.container, containerStyle, animatedContainerStyle]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <NativeTextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={THEME.colors.neutral[400]}
          {...props}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: 'auto',
    borderRadius: normalize(6),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: normalize(6),
    paddingHorizontal: THEME.spacing.sm,
    height: normalize(38),
  },
  iconContainer: {
    marginRight: normalize(8),
  },
  input: {
    flex: 1,
    fontFamily: THEME.fontFamily.regular,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: THEME.fontFamily.regular,
    marginBottom: 5,
  },
});

export default TextInput;
