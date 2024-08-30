import { View, Text } from 'react-native';
import React from 'react';
import { TextInput } from '../shared';
import { Search } from 'react-native-feather';
import { useTranslation } from 'react-i18next';

const SearchBarHome = () => {
  const { t } = useTranslation();

  return (
    <View>
      <TextInput placeholder={t("Search Product")} />
      <Search />
    </View>
  );
};

export default SearchBarHome;
