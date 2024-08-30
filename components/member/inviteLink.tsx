import React from 'react';
import { View, StyleSheet, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { THEME } from '~/constants/theme';
import { Text } from '~/components/shared';
import { Copy, Share2 } from 'react-native-feather';
import { copyToClipboard } from '~/utils/copyToClipboard';
import { onShare } from '~/utils/share';

interface InviteLinkSectionProps {
  inviteLink: string | null;
  isLoading: boolean;
  isError: boolean;
}

const InviteLinkSection = ({ inviteLink, isLoading, isError }: InviteLinkSectionProps) => {
  return (
    <View style={styles.sectionBodyCon}>
      <View style={styles.sectionBody}>
        <Text size="lg" weight="semiBold">
          Invite Link
        </Text>
        <Text weight="regular" style={styles.manageText}>
          This provides a unique URL that allows anyone to join your workspace.
        </Text>
      </View>

      <View style={[styles.uploadButton, styles.nameCont]}>
        {isLoading && <ActivityIndicator color={THEME.colors.primary} />}
        {inviteLink && (
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.uploadButtonText}>
            {inviteLink}
          </Text>
        )}
        {!inviteLink && isError && (
          <Text style={[styles.uploadButtonText, { color: THEME.colors.error }]}>
            Error fetching invite link
          </Text>
        )}
        {inviteLink && (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => onShare(inviteLink as string)}>
              <Share2 color={THEME.colors.primary} width={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => copyToClipboard(inviteLink as string)}>
              <Copy color={THEME.colors.primary} width={40} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default InviteLinkSection;

const styles = StyleSheet.create({
  sectionBodyCon: {
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    marginBottom: THEME.spacing.md,
    paddingVertical: 20,
    gap: 4,
  },
  sectionBody: {
    paddingBottom: 10,
  },
  manageText: {
    lineHeight: 24,
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
