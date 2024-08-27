import { router, Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import BasicHeader from '~/components/basic-header';
import { Dialog, DialogRef, Text, View, Button, Select } from '~/components/shared';
import { THEME } from '~/constants/theme';

const LanguageAndRegion = () => {
  const { t } = useTranslation();
  const dialogRef = useRef<DialogRef>(null);
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState('');

  const switchLanguage = () => {
    i18n.changeLanguage(selectedLang || 'en');
    dialogRef.current?.open();
  };

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Français (French)', value: 'fr' },
    { label: 'Italiano (Italian)', value: 'it' },
    { label: 'Español (Spanish)', value: 'es' },
    { label: 'Deutsch (German)', value: 'de' },
    { label: '日本語 (Japanese)', value: 'ja' },
    { label: '한국어 (Korean)', value: 'ko' },
    { label: 'Русский (Russian)', value: 'ru' },
    { label: 'العربية (Arabic)', value: 'ar' },
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
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <BasicHeader label={t('Language & Region')} />,
        }}
      />
      <View style={styles.content}>
        <Text style={styles.subHeaderText}>
          {t('Customise your language and region preferences')}
        </Text>
        <View style={styles.sectionContainer}>
          <Select
            onValueChange={(e) => setSelectedLang(e?.value || '')}
            options={languageOptions}
            placeholder={t('Language')}
          />
          <Select options={regionOptions} placeholder={t('Region')} />
          <Select options={timeZoneOptions} placeholder={t('Time-Zone')} />
        </View>

        <View style={styles.btnContaner}>
          <Button onPress={switchLanguage} children={t('Save')} />
          <Button onPress={() => router.back()} children={t('Cancel')} variant="outline" />
        </View>
      </View>
      <Dialog
        ref={dialogRef}
        title={t('Language and Region Updated')}
        description={t(
          'Language and Region updated successfully. Remember, you can always adjust these settings again later'
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
    marginHorizontal: THEME.spacing.gutter,
  },
  content: {
    rowGap: THEME.spacing.xs,
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeaderText: {
    fontSize: THEME.fontSize.sm,
    fontWeight: 400,
    marginBottom: THEME.spacing.xl,
  },
  sectionContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: THEME.spacing.md,
  },
  btnContaner: {
    marginTop: THEME.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    gap: THEME.spacing.md,
  },
});

export default LanguageAndRegion;
