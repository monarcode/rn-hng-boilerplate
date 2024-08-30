import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { THEME } from '~/constants/theme';
import useAuthStore from '~/store/auth';
import { useInvite, useUserList } from '~/hooks/dashboard/dashboard';
import Header from '~/components/member/header';
import InviteLinkSection from '~/components/member/inviteLink';
import SearchBar from '~/components/member/searchBar';
import MemberList from '~/components/member/memberList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { memberArr } from '~/components/member/member';
import { useTranslation } from 'react-i18next';

const Members = () => {
  const { t } = useTranslation()
  const authstore = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

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
