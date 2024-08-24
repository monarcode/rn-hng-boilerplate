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
import { memberArr } from '~/components/member/member';

const Members = () => {
  const authstore = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isError, isLoading } = useInvite(authstore.data?.organisations[0].organisation_id);

  const filteredMembers = React.useMemo(() => {
    return memberArr.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, memberArr]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <Header title="Members" />
      <InviteLinkSection
        inviteLink={data?.data?.invite_link || null}
        isLoading={isLoading}
        isError={isError}
      />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MemberList members={filteredMembers} />
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
