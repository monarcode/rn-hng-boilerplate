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
    <FlatList
      data={members}
      keyExtractor={(item) => item.id}
      renderItem={renderMemberItem}
      showsVerticalScrollIndicator={false}
    />
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
    gap: 10,
  },
  memberName: {
    fontWeight: 'bold',
  },
});
