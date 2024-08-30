import { useMutation, useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CheckIcon from '~/assets/icons/check.svg';
import GoBack from '~/components/go-back';
import RenderSetting from '~/components/notification-settings';
import { Dialog, DialogRef, Text, View, Button } from '~/components/shared';
import getNotificationSections from '~/constants/notification';
import { THEME } from '~/constants/theme';
import { NotificationSettingsService } from '~/services/notification-settings';
import useAuthStore from '~/store/auth';

const NotificationSettings = () => {
  const { t } = useTranslation();
  const authstore = useAuthStore();
  const dialogRef = useRef<DialogRef>(null);
  const [notificationData, setNotificationData] = useState(getNotificationSections(t));
  const { bottom: bottomInset } = useSafeAreaInsets();

  const { data: fetchedData, isLoading } = useQuery({
    queryKey: ['fetchNotification', authstore.data?.user.id],
    queryFn: () => NotificationSettingsService.getNotifications(authstore.data?.user.id),
  });

  useEffect(() => {
    if (fetchedData) setNotificationData(getNotificationSections(t, fetchedData?.data));
  }, [fetchedData]);

  const settingsMutation = useMutation({
    mutationFn: () => NotificationSettingsService.setNotifications(notificationData),
    onSuccess: (_res) => {
      dialogRef.current?.open();
    },
    onError: (_err) => {
      Alert.alert('Server error', 'An error occured while saving settings');
    },
  });

  const toggleSwitch = (sectionIndex: number, itemIndex: number) => {
    setNotificationData((prevState) => {
      const newState = [...prevState];
      newState[sectionIndex].data[itemIndex].status =
        !newState[sectionIndex].data[itemIndex].status;
      return newState;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View style={[styles.header, { marginBottom: bottomInset }]}>
            <GoBack />
            <Text size="lg" weight="semiBold">
              {t('Notification')}
            </Text>
          </View>
          <SectionList
            contentContainerStyle={styles.section}
            keyExtractor={(item, index) => item.header + index}
            sections={notificationData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index, section }) => (
              <RenderSetting
                item={item}
                toggleSwitch={toggleSwitch}
                sectionIndex={notificationData.indexOf(section)}
                itemIndex={index}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text size="xl" weight="semiBold">
                  {title}
                </Text>
              </View>
            )}
          />
          <View style={styles.saveBtn}>
            <Button
              icon={<CheckIcon />}
              loading={settingsMutation.isPending}
              onPress={() => settingsMutation.mutate()}
              children={t('Save Changes')}
            />
          </View>
        </>
      )}

      <Dialog
        ref={dialogRef}
        title={t('Notification Updated')}
        description={t(
          'Notification preferences updated successfully. Remember, you can always adjust these settings again later'
        )}
        showCloseButton={false}>
        <View style={styles.dialogButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => dialogRef.current?.close()}>
            <Text style={styles.cancelButtonText}>{t('Done')}</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    paddingHorizontal: THEME.spacing.gutter,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: THEME.spacing.sm + 4,
    marginHorizontal: THEME.spacing.md,
    alignItems: 'center',
  },
  saveBtn: {
    width: '100%',
    paddingHorizontal: THEME.spacing.md,
    marginVertical: 10,
  },
  section: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: 'rgba(188, 188, 188, 0.40)',
    backgroundColor: THEME.colors.white,
    paddingBottom: 11,
    borderBottomWidth: 0.5,
    paddingTop: THEME.spacing.md,
    paddingHorizontal: 20,
  },
  dialogButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: THEME.spacing.md,
  },
  cancelButton: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    borderRadius: THEME.spacing.sm,
    backgroundColor: THEME.colors.primary,
  },
  cancelButtonText: {
    color: THEME.colors.white,
    fontSize: THEME.fontSize.lg,
    fontWeight: 500,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationSettings;
