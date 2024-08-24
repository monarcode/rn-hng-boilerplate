import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { THEME } from '~/constants/theme';
import useAuthStore from '~/store/auth';
import { useInvite } from '~/hooks/dashboard/dashboard';
import Header from '~/components/member/header';
import InviteLinkSection from '~/components/member/inviteLink';
import SearchBar from '~/components/member/searchBar';
import MemberList from '~/components/member/memberList';
import { SafeAreaView } from 'react-native-safe-area-context';

const Members = () => {
  const authstore = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isError, isLoading } = useInvite(authstore.data?.organisations[0].organisation_id);

  // Sample members data
  const members = [
    {
      id: '1',
      name: 'Kurt Dirk',
      email: 'kurtd@gmail.com',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      id: '2',
      name: 'Lennon Kate',
      email: 'katie@gmail.com',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/400',
    },
    {
      id: '3',
      name: 'Sam Curtis',
      email: 'curty00@gmail.com',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/500',
    },
    // Add other members here...
  ];

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <Header />
      <InviteLinkSection
        inviteLink={data?.data?.invite_link || null}
        isLoading={isLoading}
        isError={isError}
      />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MemberList members={members} />
    </SafeAreaView>
  );
};

export default Members;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.spacing.gutter,
  },
});
