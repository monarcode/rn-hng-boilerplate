import { View, Text } from 'react-native';
import React from 'react';
import { TextInput } from '../shared';
import { Search } from 'react-native-feather';

const SearchBarHome = () => {
  return (
    <View>
      <TextInput placeholder="Search Product" />
      <Search />
    </View>
  );
};

export default SearchBarHome;
