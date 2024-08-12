import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Bell, Menu, Search } from 'react-native-feather';
import { View } from '~/components/shared';
import { HeaderProps } from '../types';

const Header = ({ menu, search, notification }: HeaderProps) => {
  const [active, isActive] = useState(true);
  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Pressable onPress={menu}>
        <Menu width={24} height={24} color={'#141414'} strokeWidth={2} />
      </Pressable>
      <View style={{ flexDirection: 'row', gap: 20 }}>
        <Pressable onPress={search}>
          <Search width={24} height={24} color={'#141414'} strokeWidth={2} />
        </Pressable>
        <Pressable style={Styles.buttonContainer} onPress={notification}>
          <Bell width={24} height={24} color={'#141414'} strokeWidth={2} />
          <View style={Styles.dotsContainer}>
            {active && (
              <View
                style={{
                  width: 6,
                  height: 6,
                  backgroundColor: '#F81404',
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: '#fff',
                }}
              />
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
const Styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
  },
  dotsContainer: {
    position: 'absolute',
    top: -1,
    right: 5,
  },
});
