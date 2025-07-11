import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

/**
 * Fallback language
 */
export const FALLBACK_LNG = 'en'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: FALLBACK_LNG,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
