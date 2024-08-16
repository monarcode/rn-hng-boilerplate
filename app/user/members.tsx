import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '~/constants/theme';
import GoBack from '~/components/go-back';
import { Button, Select, Text } from '~/components/shared';
import { Search } from 'react-native-feather';

// Define Props interface for a single member
interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const Members = () => {
  const [isEnabled, setEnabled] = useState(false);
  const toggleSwitch = () => setEnabled(!isEnabled);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample members data
  const members: Member[] = [
    {
      id: '1',
      name: 'Chad Bosewick',
      email: 'ChadBoseW@gmail.com',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      id: '2',
      name: 'Chad Bosewick',
      email: 'ChadBoseW@gmail.com',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      id: '3',
      name: 'Chad Bosewick',
      email: 'ChadBoseW@gmail.com',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/300',
    },
    // Add other members here...
  ];

  // Correctly typing the renderItem function
  const renderMemberItem = ({ item }: { item: Member }) => (
    <View style={styles.memberItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName} weight="semiBold">
          {item.name}
        </Text>
        <Text size="sm">{item.email}</Text>
      </View>
      <Text>{item.role}</Text>
    </View>
  );

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View style={styles.header}>
        <View style={{ gap: THEME.spacing.xs, flexDirection: 'row' }}>
          <GoBack />
          <Text size="xl" weight="semiBold">
            Members
          </Text>
        </View>
        <Text size="sm">Manage who has access to this workspace</Text>
      </View>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={renderMemberItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.sectionBodyCon}>
              <View style={styles.sectionBody}>
                <Text size="lg" weight="semiBold">
                  Invite Link
                </Text>
                <Text weight="regular" style={styles.manageText}>
                  This provides a unique URL that allows anyone to join your workspace.
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#D0D6D6', true: '#F97316' }}
                thumbColor={isEnabled ? '#F9F9F9' : '#E6F5F3'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            <View style={styles.sectionBodyCon}>
              <View style={styles.sectionBody}>
                <Text size="lg" weight="semiBold">
                  Manage members
                </Text>
                <Text weight="regular" style={styles.manageText}>
                  On the Free plan all members in a workspace are administrators.
                </Text>
              </View>
              <Button>Invite People</Button>
            </View>

            <View style={styles.searchcontainer}>
              <View style={styles.inputContainer}>
                <Search width={20} height={20} color={THEME.colors.neutral[400]} />
                <TextInput
                  placeholder="Search by name or email"
                  style={{ borderWidth: 0, fontSize: 16, width: '100%' }}
                  //   inputStyle={{ fontSize: 16, width: '100%' }}
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
              </View>
              <Select
                options={[
                  { label: 'All', value: 'All' },
                  { label: 'Members', value: 'Members' },
                  { label: 'Suspended', value: 'Suspended' },
                  { label: 'Left Workspace', value: 'Left Workspace' },
                ]}
                placeholder="All"
                onValueChange={(value) => console.log('Selected:', value)}
                iconColor={THEME.colors.black}
                containerStyle={styles.selectContainer}
              />
            </View>
          </>
        }
        ListFooterComponent={
          <View style={styles.sectionBodyCon}>
            <View style={styles.sectionBody}>
              <Text size="lg" weight="semiBold">
                Export Members List
              </Text>
              <Text weight="regular" style={styles.manageText}>
                Export a CSV with information of all members of your team
              </Text>
            </View>
            <Button variant="outline">Invite People</Button>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Members;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.spacing.gutter,
  },
  header: {
    gap: THEME.spacing.sm,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  sectionBodyCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    marginBottom: THEME.spacing.md,
  },
  sectionBody: {
    flex: 1,
    paddingBottom: 11,
    marginTop: THEME.spacing.md,
  },

  manageText: {
    lineHeight: 24,
  },
  searchcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.spacing.sm,

    overflow: 'hidden',
    flex: 2,
    gap: 5,
    height: 40,
    paddingHorizontal: THEME.spacing.sm,

    // justifyContent: 'space-between',
  },
  selectContainer: {
    flex: 1,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 15,
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderColor: '#DEDEDE',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  memberInfo: {
    flex: 1,
    gap: 10,
  },
  memberName: {
    fontWeight: 'bold',
  },
});
