// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import translations
import en from '../locales/en.json';
import fr from '../locales/fr.json'; // Example for French

// Initialize i18next
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: Localization.getLocales()?.[0]?.languageCode || 'en', // Use the locale detected by expo-localization
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
});

export default i18n;
