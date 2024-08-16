import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { StyleSheet, SectionList, Switch, SafeAreaView } from 'react-native';

import GoBack from '~/components/go-back';
import { Text, View, Button } from '~/components/shared';
import notificationSections from '~/constants/notification';
import { THEME } from '~/constants/theme';

type Item = {
  header: string;
  body: string;
};

const NotificationSettings = () => {
  const [isEnabled, setEnabled] = useState<boolean>(false);

  const renderBody = ({ item }: { item: Item }) => {
    const toggleSwitch = () => setEnabled((bool) => !bool);

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
          thumbColor={isEnabled ? '#F9F9F9' : '#E6F5F3'}
          ios_backgroundColor="#F97316"
          onValueChange={toggleSwitch}
          value={isEnabled}
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

      <Button
        containerStyle={styles.saveBtn}
        icon={<MaterialCommunityIcons name="check" size={20} color="white" />}>
        Save Changes
      </Button>

      <SectionList
        contentContainerStyle={styles.section}
        sections={notificationSections}
        renderItem={renderBody}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text size="xl" weight="semiBold">
              {title}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    paddingHorizontal: THEME.spacing.gutter,
    paddingVertical: THEME.spacing.gutter,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: THEME.spacing.sm,
  },
  saveBtn: {
    columnGap: THEME.spacing.sm,
    width: 140,
    alignSelf: 'flex-end',
    marginBottom: -40,
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
    paddingBottom: 11,
    borderBottomWidth: 0.5,
    marginTop: THEME.spacing.md,
  },
  sectionBodyCon: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionBody: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '75%',
    paddingBottom: 11,
    marginTop: THEME.spacing.md,
    gap: 12,
  },
});

export default NotificationSettings;
