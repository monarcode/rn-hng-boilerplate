import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '~/components/member/header';
import InviteLinkSection from '~/components/member/inviteLink';
import MemberList from '~/components/member/memberList';
import SearchBar from '~/components/member/searchBar';
import { THEME } from '~/constants/theme';
import { useInvite, useUserList } from '~/hooks/dashboard/dashboard';
import useAuthStore from '~/store/auth';

const Members = () => {
  const { t } = useTranslation();
  const authstore = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isError, isLoading } = useInvite(authstore.data?.organisations[0].organisation_id);
  const { data: userData, isLoading: isUserLoading } = useUserList(
    authstore.data?.organisations[0].organisation_id
  );

  const filteredMembers = React.useMemo(() => {
    return userData?.data.users.filter(
      (member) =>
        member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, userData]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <Header title={t('Members')} />
      <InviteLinkSection
        inviteLink={data?.data?.invite_link || null}
        isLoading={isLoading}
        isError={isError}
      />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MemberList members={filteredMembers} isLoading={isUserLoading} />
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
