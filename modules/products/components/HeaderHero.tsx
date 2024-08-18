import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '~/components/shared';
import { ChevronLeft } from 'react-native-feather';
import { HeaderHeroProps } from '../types';

const HeaderHero = ({ title, goback }: HeaderHeroProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowGap}>
        <Pressable onPress={goback}>
          <ChevronLeft width={18} height={18} color={'#141414'} />
        </Pressable>
        <View>
          <Text style={styles.heroTitle} size="2xl">
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderHero;

const styles = StyleSheet.create({
  rowGap: {
    flexDirection: 'row',
    gap: 90,
    alignItems: 'center',
  },
  container: {
    marginLeft: 24,
    marginTop: 20,
  },
  heroTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    lineHeight: 21.78,
    color: '#000000',
  },
});
