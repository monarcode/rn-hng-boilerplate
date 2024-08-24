import React, { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import GoBack from '~/components/go-back';
import { Dialog, DialogRef, Text, View, Button, Select } from '~/components/shared';
import { THEME } from '~/constants/theme';
import { router } from 'expo-router';


const LanguageAndRegion = () => {
  const { t } = useTranslation();
  const dialogRef = useRef<DialogRef>(null);
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState('')

  const switchLanguage = () => {
    i18n.changeLanguage(selectedLang || 'en');
    dialogRef.current?.open()
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
      <View style={[styles.header]}>
        <GoBack />
        <Text size="lg" weight="semiBold">
          {t('Language & Region')}
        </Text>
        <View />
      </View>

      <View style={styles.container}>
        <Text style={styles.subHeaderText}>
          {t('Customise your language and region prefrences')}
        </Text>
        <View style={styles.sectionContainer}>
          <Select onValueChange={e => setSelectedLang(e?.value || '')} options={languageOptions} placeholder={t('Language')} width={300} />
          <Select options={regionOptions} placeholder={t('Region')} width={300} />
          <Select options={timeZoneOptions} placeholder={t("Time-Zone")} width={300} />
        </View>

        <View style={styles.btnContaner}>
          <Button
            onPress={switchLanguage}
            children={t("Save")}
          />
          <Button
            onPress={() => router.back()}
            children={t("Cancel")}
            variant='outline'
          />
        </View>
      </View>
      <Dialog
        ref={dialogRef}
        title={t("Language and Region Updated")}
        description={t("Language and Region updated successfully. Remember, you can always adjust these settings again later")}
        showCloseButton={false}
      >
        <View style={styles.dialogButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => dialogRef.current?.close()}>
            <Text style={styles.cancelButtonText} >{t('Done')}</Text>
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
