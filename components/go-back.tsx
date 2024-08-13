import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { ChevronLeft } from 'react-native-feather';

import { THEME } from '~/constants/theme';

const GoBack = () => {
  return (
    <Pressable style={{ alignSelf: 'flex-start' }} onPress={router.back}>
      <ChevronLeft width={24} color={THEME.colors.dark} />
    </Pressable>
  );
};
export default GoBack;
