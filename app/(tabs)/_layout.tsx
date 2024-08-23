import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';

import BottomTab from '~/components/navigation/bottom-tabs';

const CustomBottomTabs = (props: BottomTabBarProps) => {
  return <BottomTab {...props} />;
};

const screenOptions = {
  headerShown: false,
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}} tabBar={CustomBottomTabs}>
      <Tabs.Screen name="index" key="index" />
      <Tabs.Screen name="products" key="products" options={screenOptions} />
      <Tabs.Screen name="orders" key="orders" options={screenOptions} />
      <Tabs.Screen name="user-settings" key="user-settings" options={screenOptions} />
    </Tabs>
  );
}
