import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ActiveMembers from '../../assets/icons/activemembers.svg';
import AllMembers from '../../assets/icons/allmembers.svg';
import Dollar from '../../assets/icons/icondollar.svg';
import Product from '../../assets/icons/products.svg';
import { Text, View } from '../shared';
import SummaryCard from './summary-card';

import { THEME } from '~/constants/theme';
import { useDashboard } from '~/hooks/dashboard/dashboard';
import useAuthStore from '~/store/auth';
import { useProducts } from '~/hooks/products/organization/fetchProducts';

const Summary = () => {
  const { t } = useTranslation();
  const authstore = useAuthStore();
  const user_id = authstore.data?.user.id;
  const { dashBoardData, isError, isLoading } = useDashboard(user_id);
  const { data } = useProducts(authstore.data?.organisations[0].organisation_id);
  
  let totalProduct = 0;
  if (data) {
    data?.forEach((category) => {
      if (category.products) {
        totalProduct += category.products.length;
      }
    });
  }

  const summary = [
    {
      title: 'Total Members',
      amount: dashBoardData ? dashBoardData.activeSubscription : 0,
      increase: '+ 0 from last month',
      Icon: AllMembers,
      color: '#509DF5',
    },
    {
      title: 'Total Products',
      amount: totalProduct,
      increase: '+ 0 added last month',
      Icon: Product,
      color: '#422AF0',
    },
    {
      title: 'Subscriptions',
      amount: dashBoardData?dashBoardData.subscriptions:0,
      increase: '+ 0 from last month',
      Icon: Dollar,
      color: '#F85547',
    },
    {
      title: 'Active Members',
      amount: dashBoardData?dashBoardData.activeSubscription:0,
      increase: '+ 0 from last month',
      Icon: ActiveMembers,
      color: '#0ED970',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={{ gap: THEME.spacing.xs }}>
        <Text size="2xl" weight="bold">
          {t('Dashboard')}
        </Text>
        <Text size="md" style={{ color: THEME.colors.neutral[300] }}>
          {t("This Month's Summary")}
        </Text>
      </View>
      <FlatList
        data={summary}
        renderItem={({ item, index }) => <SummaryCard {...item} />}
        contentContainerStyle={{ gap: THEME.spacing.md, rowGap: 10 }}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 15,
  },
});
