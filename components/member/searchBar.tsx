import React from 'react';
import { View } from 'react-native';
import { THEME } from '~/constants/theme';
import { Search } from 'react-native-feather';
import { TextInput } from '../shared';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (text: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <View>
      <TextInput
        icon={<Search width={20} height={20} color={THEME.colors.neutral[400]} />}
        label=""
        placeholder="Search by name or email"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
    </View>
  );
};

export default SearchBar;
