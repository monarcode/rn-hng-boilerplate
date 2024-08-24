import React from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';
import { THEME } from '~/constants/theme';
import { Text } from '~/components/shared';
import { Member } from '~/types/member';

interface MemberListProps {
  members: Member[];
}

const MemberList = ({ members }: MemberListProps) => {
  const renderMemberItem = ({ item }: { item: Member }) => {
    if (!item) {
      return null;
    }
    return (
      <View style={styles.memberItem}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.memberInfo}>
          <Text size="md" style={styles.memberName} weight="medium">
            {item.name}
          </Text>
          <Text size="sm">{item.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      {members.length > 0 ? (
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
  memberInfo: {
    flex: 1,
    gap: 8,
  },
  memberName: {
    fontWeight: 'bold',
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
