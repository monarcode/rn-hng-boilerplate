import { Bag, Briefcase, HomeTrendUp, Setting2 } from 'iconsax-react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { View } from '../shared';

import { THEME } from '~/constants/theme';

const AnimatedHomeIcon = Animated.createAnimatedComponent(HomeTrendUp);
const AnimatedProductsIcon = Animated.createAnimatedComponent(Briefcase);
const AnimatedCartIcon = Animated.createAnimatedComponent(Bag);
const AnimatedSettingsIcon = Animated.createAnimatedComponent(Setting2);
const AnimatedText = Animated.createAnimatedComponent(Text);

interface Props {
  route: string;
  isFocused: boolean;
}

const INACTIVE_COLOR = '#4e4e4e';

const TabIcon: React.FC<Props> = ({ route, isFocused }) => {
  const { t } = useTranslation();

  const routes = {
    index: {
      icon: AnimatedHomeIcon,
      label: t('Home'),
    },
    products: {
      icon: AnimatedProductsIcon,
      label: t('Products'),
    },
    orders: {
      icon: AnimatedCartIcon,
      label: t('Orders'),
    },
    'user-settings': {
      icon: AnimatedSettingsIcon,
      label: t('Settings'),
    },
  };

  const progress = useSharedValue(0);

  const animatedColor = useDerivedValue(() => {
    return interpolateColor(progress.value, [0, 1], [INACTIVE_COLOR, THEME.colors.primary]);
  });

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, { duration: 300 });
  }, [isFocused, progress]);

  const IconComponent = routes[route as keyof typeof routes].icon;

  return (
    <View style={styles.container}>
      <IconComponent color={animatedColor} size={24} variant="Bold" />
      <AnimatedText
        style={[styles.label, { color: isFocused ? THEME.colors.primary : INACTIVE_COLOR }]}>
        {routes[route as keyof typeof routes].label}
      </AnimatedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: THEME.spacing.sm,
    rowGap: THEME.spacing.xs,
  },
  label: {
    fontFamily: THEME.fontFamily.regular,
    fontSize: THEME.fontSize.sm,
  },
});

export default TabIcon;
