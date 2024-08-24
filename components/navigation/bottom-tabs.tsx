import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Dimensions, Pressable, StyleSheet } from 'react-native';

import TabIcon from './tab';

import { View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import normalize from '~/libs/normalize';

const width = Dimensions.get('window').width;

const BottomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const TAB_WIDTH = width / state.routes.length;

  return (
    <View style={styles.container}>
      {/* tabs list */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ position: 'relative' }}>
            <View style={[styles.tabWrapper, { width: TAB_WIDTH }]}>
              <TabIcon route={route.name} isFocused={isFocused} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: THEME.colors.white,
    height: normalize(56),
    borderTopWidth: 0.4,
    borderTopColor: THEME.colors.border,
    flexDirection: 'row',
  },
  tabWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: THEME.spacing.sm,
  },
});

export default BottomTab;
