import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';

import BottomTab from '~/components/navigation/bottom-tabs';

const CustomBottomTabs = (props: BottomTabBarProps) => {
  return <BottomTab {...props} />;
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={CustomBottomTabs}>
      <Tabs.Screen name="index" key="index" />
      <Tabs.Screen name="products" key="products" />
      <Tabs.Screen name="cart" key="cart" />
      <Tabs.Screen name="user-settings" key="user-settings" />
    </Tabs>
  );
}
