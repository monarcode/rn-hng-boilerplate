import { Stack } from 'expo-router';
import React from 'react';
import { Alert, FlatList, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EmptyOrg from '~/assets/icons/empty-organisation.svg';
import GoBack from '~/components/go-back';
import OrganasitionCard from '~/components/manage-organisation/manage-organisation-card';
import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

const data = [
  {
    id: 1,
    logo: 'https://i.pravatar.cc/300',
    name: 'ABC Corp',
    status: false,
    link: 'abc.boilerplate.com',
  },
  {
    id: 2,
    logo: 'https://i.pravatar.cc/300',
    name: 'XYZ Corp',
    status: false,
    link: 'xyz.boilerplate.com',
  },
  {
    id: 3,
    logo: 'https://i.pravatar.cc/300',
    name: 'PQR Corp',
    status: false,
    link: 'pqr.boilerplate.com',
  },
];

const ManageOrganisation = () => {
  const { top } = useSafeAreaInsets();
  const [organisation, setOrganisation] = React.useState(data);

  const toggleSwitch = (index: number) => {
    Alert.alert(
      'Confirm Action',
      'Are you sure you want to change the organisation status?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, continue',
          onPress: () => {
            setOrganisation((prevState) => {
              return prevState.map((org, i) => {
                if (i === index) {
                  return { ...org, status: !org.status };
                }
                return { ...org, status: false };
              });
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
          header(props) {
            return (
              <View
                style={{
                  width: '100%',
                  paddingTop: top,
                  paddingBottom: 6,
                  elevation: 1,
                  borderWidth: 1,
                  backgroundColor: THEME.colors.white,
                  borderColor: THEME.colors.borderLight,
                }}>
                <View style={styles.headerContainer}>
                  <View style={styles.headerLeft}>
                    <GoBack />
                    <Text size="xl" weight="semiBold">
                      Manage Organisation
                    </Text>
                  </View>
                </View>
              </View>
            );
          },
        }}
      />

      <ScrollView style={styles.container}>
        {organisation.length > 0 ? (
          <>
            <View style={styles.descWrapper}>
              <Text size="lg" weight="semiBold" style={styles.title}>
                Keep track of your organisation here
              </Text>

              <Text style={styles.desc}>
                Click the toggle buttons to swtich through organisations
              </Text>
            </View>
            <FlatList
              data={organisation}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}
              ItemSeparatorComponent={() => <View style={styles.seperator} />}
              keyExtractor={(item, index) => item.name + index}
              renderItem={({ item, index }) => (
                <OrganasitionCard
                  item={item}
                  index={index}
                  toggleSwitch={toggleSwitch}
                  isActive={item.status}
                />
              )}
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyImgContainer}>
              <EmptyOrg />
            </View>
            <Text size="lg" weight="semiBold" style={styles.emptyText}>
              No organisation yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: THEME.spacing.sm,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: THEME.spacing.sm,
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: THEME.colors.white,
  },
  contentContainerStyle: {
    flex: 1,
    marginVertical: 28,
  },
  descWrapper: {
    rowGap: 5,
    paddingTop: 24,
  },
  title: {
    color: THEME.colors.dark,
  },
  desc: {
    lineHeight: 20,
    color: THEME.colors.neutral[400],
  },
  seperator: {
    height: 1,
    marginVertical: 8,
    backgroundColor: THEME.colors.borderLight,
  },
  emptyContainer: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: THEME.spacing.lg,
  },
  emptyImgContainer: {
    width: '70%',
    overflow: 'hidden',
  },
  emptyText: {
    textAlign: 'center',
    color: THEME.colors.neutral[300],
  },
});

export default ManageOrganisation;
