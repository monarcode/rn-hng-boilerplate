// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import translations
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import it from '../locales/it.json';
import es from '../locales/es.json';
import de from '../locales/de.json';
import ja from '../locales/ja.json';
import ko from '../locales/ko.json';
import ru from '../locales/ru.json';
import ar from '../locales/ar.json';

// Initialize i18next
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: Localization.getLocales()?.[0]?.languageCode || 'en', // Use the locale detected by expo-localization
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    it: { translation: it },
    es: { translation: es },
    de: { translation: de },
    ja: { translation: ja },
    ko: { translation: ko },
    ru: { translation: ru },
    ar: { translation: ar },
  },
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
});

export default i18n;
