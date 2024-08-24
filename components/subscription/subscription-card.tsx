import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import BenefitCard from './benefit-card';
import { Button, Text, View } from '../shared';

import { THEME } from '~/constants/theme';
import normalize from '~/libs/normalize';

export default function SubscriptionCard({ plan }: any) {
  return (
    <Pressable style={[styles.container, plan.active ? styles.activePlan : styles.inactivePlan]}>
      <View style={styles.planType}>
        <Text size="lg" weight="semiBold">
          {plan?.plan} Plan
        </Text>
        <View style={styles.priceWrapper}>
          <Text size="3xl" weight="medium" style={styles.price}>
            ${plan?.price}
          </Text>
          <Text size="md" weight="medium" style={styles.duration}>
            /{plan?.period}
          </Text>
        </View>

        <Text size="md" weight="regular" style={styles.planDesc}>
          {plan?.description}
        </Text>
      </View>

      <View style={styles.benefits}>
        {plan?.features.map((text: string) => <BenefitCard benefit={text} />)}
      </View>

      <View>
        {plan?.active ? (
          <Button children="Current Plan" variant="inactive" />
        ) : (
          <Button children="Upgrade" />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(10),
    paddingTop: THEME.spacing.xl,
    paddingBottom: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
  },
  activePlan: {
    borderWidth: 1,
    borderColor: THEME.colors.primary,
  },
  inactivePlan: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  planType: {
    width: '98%',
    rowGap: 14,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  price: {
    color: '#0A0A0A',
  },
  duration: {
    marginTop: 6,
    color: THEME.colors.neutral[300],
  },
  planDesc: {
    lineHeight: 21,
    color: THEME.colors.neutral[300],
  },
  benefits: {
    marginTop: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    rowGap: 14,
  },
});
