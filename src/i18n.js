import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import translationEN from './locales/english/translation.json';
import translationHE from './locales/hebrew/translation.json';
import translationRU from './locales/russian/translation.json';
import translationPO from './locales/portuguese/translation.json';

const resources = {
  English: {
    translation: translationEN
  },
  Hebrew: {
    translation: translationHE
  },
  Russian: {
    translation: translationRU
  },
  Portuguese: {
    translation: translationPO
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "English",
    fallbackLng: "English",
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;