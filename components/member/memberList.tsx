import React from 'react';
import { FlatList, View, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { THEME } from '~/constants/theme';
import { Text } from '~/components/shared';
import { Member } from '~/types/member';
import { useRouter } from 'expo-router';

interface MemberListProps {
  members: Member[] | undefined;
  isLoading: boolean;
}

const MemberList = ({ members, isLoading }: MemberListProps) => {
  const router = useRouter();

  function gotoMemberDetail(userId: string) {
    router.push(`/user/members/${userId}`);
  }

  const renderMemberItem = ({ item }: { item: Member }) => {
    if (!item) {
      return null;
    }

    const initials = `${item.first_name.charAt(0)}${item.last_name.charAt(0)}`;

    return (
      <Pressable onPress={() => gotoMemberDetail(item.first_name)}>
        <View style={styles.memberItem}>
          {item.avatar_url ? (
            <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
          ) : (
            <View style={styles.initialsContainer}>
              <Text weight="semiBold" style={styles.initialsText}>
                {initials.toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.memberInfo}>
            <Text size="md" weight="semiBold">
              {item.first_name} {item.last_name}
            </Text>
            <Text size="sm">{item.email}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      {isLoading && <ActivityIndicator color={THEME.colors.primary} style={{ marginTop: 10 }} />}
      {!isLoading && members && members?.length > 0 ? (
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={renderMemberItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text size="lg" style={styles.noResultsText}>
            No results found
          </Text>
        </View>
      )}
    </>
  );
};

export default MemberList;

const styles = StyleSheet.create({
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: THEME.colors.border, // Use a neutral background color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initialsText: {
    fontSize: 20,
    color: THEME.colors.dark, // Text color for initials
  },
  memberInfo: {
    flex: 1,
    gap: 8,
  },

  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    color: THEME.colors.neutral[400],
  },
});
