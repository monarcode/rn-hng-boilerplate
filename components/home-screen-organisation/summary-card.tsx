import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Text, View } from '../shared';
import { SummaryProps } from './type';

import { THEME } from '~/constants/theme';
import { useTranslation } from 'react-i18next';

interface CardProps extends SummaryProps {
  Icon: React.FC<SvgProps>;
}

const SummaryCard = (summary: CardProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'space-between',
          gap: 20,
        }}>
        <View
          style={{
            backgroundColor: summary.color,
            padding: 10,
            alignSelf: 'flex-start',
            borderRadius: 100,
          }}>
          <summary.Icon height={20} width={20} />
        </View>
      </View>
      <View style={{ gap: THEME.spacing.xs }}>
        <Text size="2xl" weight="bold" style={{ color: '#383f4e' }}>
          {summary.amount}
        </Text>
        <Text size="md" weight="bold" style={{ color: THEME.colors.neutral[400] }}>
          {t(summary.title)}
        </Text>
        <Text size="sm" style={{ color: '#383f4e' }}>
          + 0 {t(summary.increase)}
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
