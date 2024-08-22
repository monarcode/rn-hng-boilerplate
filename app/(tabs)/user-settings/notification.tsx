import React, { useRef, useState } from 'react';
import { StyleSheet, SectionList, Switch, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from '~/app/modal';

import GoBack from '~/components/go-back';
import { Dialog, DialogRef, Text, View, Button } from '~/components/shared';
import notificationSections from '~/constants/notification';
import { THEME } from '~/constants/theme';

type Item = {
  header: string;
  body: string;
  status: true | false;
};

const NotificationSettings = () => {
  const dialogRef = useRef<DialogRef>(null);
  const [notificationData, setNotificationData] = useState(notificationSections);

  const toggleSwitch = (sectionIndex: number, itemIndex: number) => {
    setNotificationData((prevState) => {
      const newState = [...prevState];
      newState[sectionIndex].data[itemIndex].status =
        !newState[sectionIndex].data[itemIndex].status;
      return newState;
    });
  };

  const renderBody = ({
    item,
    sectionIndex,
    itemIndex,
  }: {
    item: any;
    sectionIndex: number;
    itemIndex: number;
  }) => {
    return (
      <View style={styles.sectionBodyCon}>
        <View style={styles.sectionBody}>
          <Text size="md" weight="medium">
            {item.header}
          </Text>
          <Text size="sm" weight="regular">
            {item.body}
          </Text>
        </View>
        <Switch
          trackColor={{ false: '#D0D6D6', true: '#F97316' }}
          thumbColor={item.status ? '#F9F9F9' : '#E6F5F3'}
          ios_backgroundColor="#F97316"
          onValueChange={() => toggleSwitch(sectionIndex, itemIndex)}
          value={item.status}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header]}>
        <GoBack />
        <Text size="lg" weight="semiBold">
          Notification
        </Text>
        <View />
      </View>

      <SectionList
        contentContainerStyle={styles.section}
        keyExtractor={(item, index) => item.header + index}
        sections={notificationData}
        renderItem={({ item, index, section }) =>
          renderBody({ item, sectionIndex: notificationData.indexOf(section), itemIndex: index })
        }
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text size="xl" weight="semiBold">
              {title}
            </Text>
          </View>
        )}
      />

      <View style={styles.saveBtn}>
        <Button onPress={() => dialogRef.current?.open()} children="Save Changes" />
      </View>

      <Dialog
        ref={dialogRef}
        title="Notification Updated"
        description="Notification preferences updated successfully. Remember, you can always adjust these settings again later"
        showCloseButton={false}
      >
        <View style={styles.dialogButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => dialogRef.current?.close()}>
            <Text style={styles.cancelButtonText} >Cancel</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: THEME.colors.white,
    paddingHorizontal: 20,
    paddingVertical: THEME.spacing.gutter,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.sm,
    width: '100%',
    paddingVertical: THEME.spacing.sm,
  },
  saveBtn: {
    width: '100%',
    paddingHorizontal: THEME.spacing.md,
    marginVertical: 10
  },
  section: {
    width: '100%',
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
  sectionBodyCon: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionBody: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '75%',
    paddingBottom: 11,
    marginTop: THEME.spacing.md,
    gap: 12,
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
    fontWeight: 500
  }
});

export default NotificationSettings;
