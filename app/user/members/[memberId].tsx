import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '~/constants/theme';
import { Text, Button, Dialog, DialogRef } from '~/components/shared';
import { Camera } from 'react-native-feather';
import Header from '~/components/member/header';
import { useLocalSearchParams } from 'expo-router';

const MemberProfile = () => {
  const dialogRef = React.useRef<DialogRef>(null);
  const { memberId } = useLocalSearchParams();

  const handleEditProfile = () => {
    // Handle edit profile action
  };

  const handleDeleteProfile = () => {
    dialogRef.current?.open();
    // Handle delete profile action
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <Header title="Member Profile" />
      <ScrollView>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/300' }} // Replace with the actual profile picture URL
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <Camera width={40} fill={THEME.colors.dark} stroke={THEME.colors.white} />
            </TouchableOpacity>
          </View>

          <Text size="xl" weight="bold" style={styles.nameText}>
            {memberId}
          </Text>
          <Text size="md" style={styles.emailText}>
            {memberId}@gmail.com
          </Text>
        </View>

        <View style={styles.bioContainer}>
          <Text size="lg" weight="semiBold">
            Member's Bio
          </Text>
          <Text style={styles.bioText}>
            <Text weight="semiBold">{memberId}</Text> is a seasoned product designer with over 8
            years of experience in crafting user-centric digital experiences. With a strong
            background in UI/UX design, Flores has a passion for creating intuitive interfaces that
            delight users while driving business results.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button onPress={handleEditProfile} variant="primary">
          Edit Profile
        </Button>
        <Button onPress={handleDeleteProfile} variant="outline">
          Delete Profile
        </Button>
      </View>
      <Dialog
        ref={dialogRef}
        title="Delete Member"
        description={`Are you sure you want to delete ${memberId}? All data will be permanently removed. This action cannot be undone`}
        showCloseButton={false}>
        <View style={styles.rowGap}>
          <Button onPress={() => dialogRef.current?.close()} variant="secondary">
            Cancel
          </Button>
          <Button
            onPress={() => dialogRef.current?.close()}
            containerStyle={{
              backgroundColor: '#DC2626',
            }}>
            Delete
          </Button>
        </View>
      </Dialog>
    </SafeAreaView>
  );
};

export default MemberProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.spacing.gutter,
    backgroundColor: THEME.colors.white,
  },

  profileContainer: {
    alignItems: 'center',
    marginBottom: THEME.spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: THEME.spacing.sm,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 10,
  },

  nameText: {
    marginBottom: THEME.spacing.xs,
  },
  emailText: {
    color: THEME.colors.neutral[300],
  },
  bioContainer: {
    marginBottom: THEME.spacing.lg,
    gap: 10,
  },
  bioText: {
    color: THEME.colors.neutral[400],
    marginTop: THEME.spacing.xs,
    lineHeight: 18,
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: THEME.spacing.sm,
    marginVertical: 20,
  },
  editButton: {
    backgroundColor: THEME.colors.primary,
  },
  deleteButton: {
    borderColor: THEME.colors.error,
    borderWidth: 1,
  },
  rowGap: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
});
