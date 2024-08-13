import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { Text } from '~/components/shared';
import { THEME } from '~/constants/theme';

const SettingItem = ({ icon, title, goto }: { icon: any; title: string; goto?: () => void }) => (
  <TouchableOpacity style={styles.settingItem} onPress={goto ?? (() => {})}>
    {icon}
    <Text size="md" style={styles.settingText}>
      {title}
    </Text>
    <Ionicons name="chevron-forward" size={16} color={THEME.colors.neutral[300]} />
  </TouchableOpacity>
);

export default SettingItem;

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.md - 3,
  },
  settingText: {
    flex: 1,
    marginLeft: THEME.spacing.sm,
  },
});
