import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '~/constants/theme';
import GoBack from '~/components/go-back';
import { Button, Select, Text } from '~/components/shared';
import { Search, X, Share, Share2 } from 'react-native-feather';

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
      name: 'Chad Bosewick1',
      email: 'ChadBoseW1@gmail.com',
      name: 'Chad Bosewick1',
      email: 'ChadBoseW1@gmail.com',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/300',
    },
    {
      id: '2',
      name: 'Chad Bosewick2',
      email: 'ChadBoseW2@gmail.com',
      name: 'Chad Bosewick2',
      email: 'ChadBoseW2@gmail.com',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/400',
      avatar: 'https://i.pravatar.cc/400',
    },
    {
      id: '3',
      name: 'Chad Bosewick3',
      email: 'ChadBoseW3@gmail.com',
      name: 'Chad Bosewick3',
      email: 'ChadBoseW3@gmail.com',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/500',
      avatar: 'https://i.pravatar.cc/500',
    },
    // Add other members here...
  ];

  // Correctly typing the renderItem function
  const renderMemberItem = ({ item }: { item: Member }) => {
    if (!item) {
      console.error('Item is null or undefined', item);
      return null;
    }
    return (
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
  };
  const renderMemberItem = ({ item }: { item: Member }) => {
    if (!item) {
      console.error('Item is null or undefined', item);
      return null;
    }
    return (
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
  };

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
        </View>
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
        </View>

        <View style={[styles.uploadButton, styles.nameCont]}>
          <Text style={styles.uploadButtonText}>
            {
              'https://www.figma.com/design/7hCSTNzQOJLl9aww6wEEd1/Managing-Users----Team-Learn-AI?node-i'
            }
          </Text>
          <View style={{ flex: 0.25 }}>
            <View style={{ flexDirection: 'row' }}>
              <Share2 color="black" width={40} />
              <X color="red" width={40} />
            </View>
          </View>
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
        </View>
      </>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={renderMemberItem}
        showsVerticalScrollIndicator={false}
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
        </View>
      </>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={renderMemberItem}
        showsVerticalScrollIndicator={false}
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
    paddingVertical: 15,
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
    paddingVertical: 15,
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

  uploadButton: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    position: 'relative',
  },
  uploadButtonText: {
    color: THEME.colors.black,
    flex: 1,
  },
  nameCont: {
    padding: THEME.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  uploadButton: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    position: 'relative',
  },
  uploadButtonText: {
    color: THEME.colors.black,
    flex: 1,
  },
  nameCont: {
    padding: THEME.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
