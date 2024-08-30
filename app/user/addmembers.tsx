import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { View, Text, TextInput, Button } from '~/components/shared';
import { SafeAreaView } from 'react-native-safe-area-context';
import BasicHeader from '~/components/basic-header';
import GoBack from '~/components/go-back';
import useAuthStore from '~/store/auth';
import { THEME } from '~/constants/theme';
import normalize from '~/libs/normalize';
import { Link, Mail, Phone } from 'react-native-feather';
import { useInvite } from '~/hooks/dashboard/dashboard';
import { copyToClipboard } from '~/utils/copyToClipboard';
import PhoneBook from '../../assets/icons/phonebook.svg'
import HandShake from '../../assets/icons/handshake.svg'

const AddMembers = () => {
  const authstore = useAuthStore();
  const userData = useAuthStore((state) => state.data?.user);
  const { data, isError, isLoading } = useInvite(authstore.data?.organisations[0].organisation_id);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', gap: normalize(THEME.spacing.sm) }}>
          <GoBack />
          <View>
            <Text size="xl" weight="semiBold">
              Add Members
            </Text>
            <Text size="lg">{userData?.first_name}</Text>
          </View>
        </View>
        {/* copy Link */}
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center', gap: normalize(4) }}
          onPress={() => {
            copyToClipboard((data?.data?.invite_link || null) as string);
          }}>
          <Link height={15} width={15} color={'#999999'} />
          <Text size="lg" style={{ color: '#999999' }}>
            Copy Link
          </Text>
        </Pressable>
      </View>
      {/* content */}
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          paddingHorizontal: THEME.spacing.md,
          paddingTop: normalize(15),
        }}>
        <View style={{ gap: normalize(15) }}>
          <Text size="lg" style={{ textAlign: 'center' }}>
            Send invites for who you would like to add
          </Text>
          <View style={{ gap: normalize(15) }}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: THEME.spacing.md,
                borderRadius: 10,
                borderColor: '#CBD5E1',
              }}>
              <Mail height={normalize(20)} width={normalize(20)} color={'#AEAEAE'} />
              <TextInput
                placeholder="Add an email address"
                containerStyle={{ borderWidth: 0 }}
                style={{ width: '90%' }}
              />
            </View>

            {/*  */}

            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: THEME.spacing.md,
                borderRadius: normalize(6),
                borderColor: '#CBD5E1',
                height: normalize(38),
              }}>
              <PhoneBook height={normalize(20)} width={normalize(20)} color={'#AEAEAE'} />
              <View style={{ width: '90%', paddingHorizontal: normalize(8) }}>
                <Text style={{ color: THEME.colors.neutral[400] }}>Invite from phonebook</Text>
              </View>
            </View>

            <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: THEME.colors.neutral[300] }}>Working is better in teams. </Text>
              <HandShake />
            </View>
          </View>
        </View>
        <Button>Send Invite</Button>
      </View>
    </SafeAreaView>
  );
};

export default AddMembers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize(THEME.spacing.sm),
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    paddingVertical: normalize(THEME.spacing.sm),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
