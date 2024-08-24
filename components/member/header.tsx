import React from 'react';
import { View, StyleSheet } from 'react-native';
import { THEME } from '~/constants/theme';
import GoBack from '~/components/go-back';
import { Text } from '~/components/shared';

const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.header}>
      <View style={{ gap: THEME.spacing.xs, flexDirection: 'row' }}>
        <GoBack />
        <Text size="xl" weight="semiBold">
          {title}
        </Text>
      </View>
      <Text size="sm">Manage who has access to this workspace</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    gap: THEME.spacing.sm,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
});
