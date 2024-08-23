import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import GoBack from '~/components/go-back';
import { Dialog, DialogRef, Text, View, Button, Select } from '~/components/shared';
import { THEME } from '~/constants/theme';
import { TimeZoneService } from '~/services/timeZones';
import { router } from 'expo-router';

const LanguageAndRegion = () => {
  const dialogRef = useRef<DialogRef>(null);

  const { data: fetchedData, isLoading } = useQuery({
    queryKey: ['fetchTimeZone'],
    queryFn: TimeZoneService.getTimeZone
  })

  console.log('fetchedData', fetchedData)

  const settingsMutation = useMutation({
    mutationFn: () => TimeZoneService.setTimeZone(null),
    onSuccess: (res) => {
      dialogRef.current?.open()
    },
    onError: (err) => {
      Alert.alert('Server error', 'An error occured while saving settings')
    }
  })

  const languageOptions = [
    { label: 'Italiano (Italian)', value: 'Italiano (Italian)' },
    { label: 'Español (Spanish)', value: 'Español (Spanish)' },
    { label: 'Français (French)', value: 'Français (French)' },
    { label: 'Deutsch (German)', value: 'Deutsch (German)' },
    { label: 'English', value: 'English' },
    { label: '日本語 (Japanese)', value: '日本語 (Japanese)' },
    { label: '한국어 (Korean)', value: '한국어 (Korean)' },
    { label: 'Русский (Russian)', value: 'Русский (Russian)' },
    { label: 'العربية (Arabic)', value: 'العربية (Arabic)' },
  ];

  const regionOptions = [
    { label: 'France', value: 'France' },
    { label: 'Canada', value: 'Canada' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Germany', value: 'Germany' },
    { label: 'United States', value: 'United States' },
    { label: 'Japan', value: 'Japan' },
    { label: 'South Korea', value: 'South Korea' },
    { label: 'Russian', value: 'Russian' },
    { label: 'United Arab Emirates', value: 'United Arab Emirates' },
  ];

  const timeZoneOptions = [
    { label: 'GMT: Greenwich Mean Time', value: 'GMT: Greenwich Mean Time' },
    { label: 'EST: Eastern Standard Time', value: 'EST: Eastern Standard Time' },
    { label: 'UTC: Universal Time Coordinated', value: 'UTC: Universal Time Coordinated' },
    { label: 'IST: Indian Standard Time', value: 'IST: Indian Standard Time' },
    { label: 'CST: China Standart Time', value: 'CST: China Standart Time' },
    { label: 'JST: Japan Standard Time', value: 'JST: Japan Standard Time' },
    { label: 'AST: Arabia Standard Time', value: 'AST: Arabia Standard Time' },
    { label: 'PT: Pacific Time', value: 'PT: Pacific Time' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <View style={[styles.header]}>
            <GoBack />
            <Text size="lg" weight="semiBold">
              Language & Region
            </Text>
            <View />
          </View>

          <View style={styles.container}>
            <Text style={styles.subHeaderText}>Customise your language and region prefrences</Text>
            <View style={styles.sectionContainer}>
              <Select options={languageOptions} placeholder="Language" width={300} />
              <Select options={regionOptions} placeholder="Region" width={300} />
              <Select options={timeZoneOptions} placeholder="Time-Zone" width={300} />
            </View>

            <View style={styles.btnContaner}>
              <Button
                loading={settingsMutation.isPending}
                onPress={() => dialogRef.current?.open()}
                children="Save"
              />
              <Button
                onPress={() => router.back()}
                children="Cancel"
                variant='outline'
              />
            </View>
          </View>

        </>
      )}
      <Dialog
        ref={dialogRef}
        title="Language and Region Updated"
        description="Language and Region updated successfully. Remember, you can always adjust these settings again later"
        showCloseButton={false}
      >
        <View style={styles.dialogButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => dialogRef.current?.close()}>
            <Text style={styles.cancelButtonText} >Done</Text>
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
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subHeaderText: {
    fontSize: THEME.fontSize.sm,
    fontWeight: 400,
    marginBottom: THEME.spacing.xl
  },
  sectionContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: THEME.spacing.md
  },
  btnContaner: {
    marginTop: THEME.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    gap: THEME.spacing.md
  }
});

export default LanguageAndRegion;
