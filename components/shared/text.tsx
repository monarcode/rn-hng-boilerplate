import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

import { THEME } from '~/constants/theme';

/**
 * Extend Native Text props
 */
interface TextProps extends RNTextProps {
  size?: keyof typeof THEME.fontSize;
  weight?: keyof typeof THEME.fontFamily;
}

/**
 * Custom Text component with configurable size and weight, extends Native Text
 *
 * @param {TextProps} props - The props for the Text component
 * @returns {JSX.Element} Rendered Text component
 *
 * @example
 * <Text size="lg" weight="bold">Large Bold Text</Text>
 * <Text size="sm" weight="light">Small Light Text</Text>
 * <Text>Default Text</Text>
 */
const Text = ({ children, style, size = 'md', weight = 'regular', ...props }: TextProps) => {
  return (
    <RNText
      style={[
        styles.default,
        {
          fontSize: THEME.fontSize[size],
          fontFamily: THEME.fontFamily[weight],
        },
        style,
      ]}
      {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  default: {
    color: THEME.colors.black,
    fontFamily: THEME.fontFamily.regular,
    fontSize: THEME.fontSize.md,
  },
});

export default Text;
