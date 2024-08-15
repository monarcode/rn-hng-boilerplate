import { StyleSheet } from 'react-native';

import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import { useLocalSearchParams } from 'expo-router';

const ViewProductsByCategory = () => {
  return (
    <View style={styles.container}>
      <Text>ViewProductsByCategory</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.gutter,
    backgroundColor: THEME.colors.white,
  },
});

export default ViewProductsByCategory;
