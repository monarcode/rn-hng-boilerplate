import React from 'react';
import { Image, StyleSheet, Switch } from 'react-native';

import { Text, View } from '../shared';

import { THEME } from '~/constants/theme';

interface ItemProps {
  id: number;
  logo: string;
  name: string;
  link: string;
  status: boolean;
}

interface OrganisationProps {
  item: ItemProps;
  toggleSwitch: (index: number) => void;
  index: number;
  isActive: boolean;
}

const OrganasitionCard: React.FC<OrganisationProps> = ({ item, index, toggleSwitch, isActive }) => {
  return (
    <View style={styles.cardContainer}>
      <View
        style={[
          styles.imageContainer,
          {
            borderWidth: isActive ? 1.5 : 0,
            borderColor: isActive ? THEME.colors.primary : 'transparent',
          },
        ]}>
        <Image source={{ uri: item?.logo }} style={styles.logo} resizeMode="cover" />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.textContainer}>
          <Text weight="semiBold" style={styles.name}>
            {item.name}
          </Text>
          <Text weight="regular" style={styles.link}>
            {item.link}
          </Text>
        </View>

        <Switch
          trackColor={{ false: '#D0D6D6', true: '#F97316' }}
          thumbColor={item?.status ? '#F9F9F9' : '#E6F5F3'}
          ios_backgroundColor="#D0D6D6"
          onValueChange={() => toggleSwitch(index)}
          value={item?.status}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    columnGap: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 74,
    height: 60,
    padding: 2,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E8F8FC',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  name: {
    fontSize: 16,
    color: THEME.colors.dark,
  },
  textContainer: {
    flex: 1,
    rowGap: 3,
  },
  link: {
    fontSize: 14,
    color: THEME.colors.neutral[300],
  },
  statusSwitch: {},
});

export default OrganasitionCard;
