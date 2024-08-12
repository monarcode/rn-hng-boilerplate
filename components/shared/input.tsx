import React, { ReactNode } from 'react';
import { TextInput as NativeTextInput, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Text from './text';

import { THEME } from '~/constants/theme';

/**
 * Props for the TextInput component.
 */
interface TextInputProps {
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
}

/**
 * A customizable TextInput component.
 * Features animated focus states, optional icon, and label.
 *
 * @component
 * @example
 * // Basic usage
 * <TextInput
 *   placeholder="Enter your name"
 *   value={name}
 *   onChangeText={setName}
 * />
 *
 * @example
 * // With icon and label
 * import { UserIcon } from 'your-icon-library';
 *
 * <TextInput
 *   label="Username"
 *   placeholder="Enter your username"
 *   value={username}
 *   onChangeText={setUsername}
 *   icon={<UserIcon size={20} color={THEME.colors.dark} />}
 * />
 *
 * @example
 * // Custom styling
 * <TextInput
 *   placeholder="Custom input"
 *   value={customValue}
 *   onChangeText={setCustomValue}
 *   containerStyle={{ backgroundColor: '#f0f0f0' }}
 *   inputStyle={{ color: 'blue' }}
 *   focusColor="green"
 *   unfocusedColor="gray"
 * />
 */
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
}) => {
  const focusProgress = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(focusProgress.value, [0, 1], [unfocusedColor, focusColor]);

    return {
      borderColor,
    };
  });

  const handleFocus = () => {
    focusProgress.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    focusProgress.value = withTiming(0, { duration: 200 });
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
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: 'auto',
    overflow: 'hidden',
    borderRadius: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.6,
    borderRadius: 8,
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
});

export default TextInput;
