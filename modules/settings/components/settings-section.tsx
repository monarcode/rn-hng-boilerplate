import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from '~/components/shared';
import { THEME } from '~/constants/theme';

const SettingsSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <View style={styles.section}>
    <Text size="lg" weight="semiBold" style={styles.sectionTitle}>
      {title}
    </Text>
    {children}
  </View>
);

export default SettingsSection;

const styles = StyleSheet.create({
  section: {
    marginBottom: THEME.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  sectionTitle: {
    marginBottom: THEME.spacing.lg,
  },
});
