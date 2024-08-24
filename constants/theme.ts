import normalize from '~/libs/normalize';

const colors = {
  primary: '#F97316',
  black: '#000000',
  white: '#FFFFFF',
  border: '#CBD5E1',
  apply: '#FCB889',
  neutral: {
    300: '#525252',
    400: '#7B7B7B',
  },
  dark: '#0F172A',
  red: '#DC2626',
  green: '#6DC347',
  error: '#E80D0D',
  success: '#6DC347',
  toastText: {
    success: '#00A11F',
    error: '#A11300',
  },
  toastBg: {
    success: '#DAF1DF',
    error: '#F1DADA',
  },
  borderLight: '#F7F7F7',
  border_alt: '#B2B0B0',
} as const;

const spacing = {
  xs: 4,
  sm: normalize(8),
  md: normalize(14),
  lg: normalize(22),
  xl: normalize(30),
  /** Screen horizontal padding */
  gutter: normalize(18),
} as const;

const fontFamily = {
  light: 'Inter_300Light',
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
  black: 'Inter_900Black',
} as const;

const fontSize = {
  xs: normalize(7),
  sm: normalize(9),
  md: normalize(11),
  lg: normalize(13),
  xl: 18,
  '2xl': 20,
  '3xl': 24,
} as const;

export const THEME = {
  colors,
  spacing,
  fontFamily,
  fontSize,
};
