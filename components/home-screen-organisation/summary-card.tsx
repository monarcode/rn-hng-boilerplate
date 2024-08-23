import React, { SVGProps } from 'react';
import { StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Text, View } from '../shared';
import { SummaryProps } from './type';

import { THEME } from '~/constants/theme';
import { SvgProps } from 'react-native-svg';

interface CardProps extends SummaryProps {
  Icon: React.FC<SvgProps>;
}

const SummaryCard = (summary: CardProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
        }}>
        <Text size="md" weight="bold" style={{ color: THEME.colors.neutral[400] }}>
          {summary.title}
        </Text>
        <summary.Icon height={20} width={20} />
        <summary.Icon height={20} width={20} />
      </View>
      <View style={{ gap: THEME.spacing.xs }}>
        <Text size="2xl" weight="semiBold" style={{ color: '#383f4e' }}>
          {summary.amount}
        </Text>
      </View>
    </View>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  container: {
    borderColor: THEME.colors.borderLight,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    gap: THEME.spacing.md,
    flex: 1,
    maxWidth: '48%',
  },
});
