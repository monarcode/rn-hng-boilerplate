import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GoBack from './go-back';

import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

const BasicHeader = ({ label }: { label: string }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <View
        style={{
          marginLeft: -4,
        }}>
        <GoBack />
      </View>

      <Text size="lg" weight="medium">
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    columnGap: 10,
    paddingHorizontal: THEME.spacing.gutter,
    backgroundColor: 'red',
  },
});

export default BasicHeader;
