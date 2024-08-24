import { Pressable, StyleSheet, PixelRatio, AccessibilityInfo } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, View } from '~/components/shared';
import { ChevronLeft } from 'react-native-feather';
import { HeaderHeroProps } from '../types';
import GoBack from '~/components/go-back';
import { THEME } from '~/constants/theme';

const HeaderHero = ({ title }: HeaderHeroProps) => {
  const [textSize, setTextSize] = useState<number>(20);

  useEffect(() => {
    const handleFontScaleChange = () => {
      const fontScale = PixelRatio.getFontScale();
      const scaledSize = 15 * fontScale;
      setTextSize(scaledSize);
    };

    handleFontScaleChange();

    const fontScaleListener = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      handleFontScaleChange
    );

    return () => {
      fontScaleListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rowGap}>
        <GoBack />

        <View style={styles.abMiddle}>
          <Text style={styles.heroTitle}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderHero;

const styles = StyleSheet.create({
  rowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.gutter,
  },
  container: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  heroTitle: {
    fontFamily: THEME.fontFamily.semiBold,
    lineHeight: 21.78,
    color: '#000000',
    fontSize: THEME.fontSize['2xl'],
  },
  abMiddle: {},
});
