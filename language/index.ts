import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from './resources/zh';
import en from './resources/en';
import antdZh from 'antd/es/locale/zh_CN'
import antdEn from 'antd/es/locale/en_US'

const resources = { 
  zh: { translation: {...zh, ...antdZh} },
  en: { translation: {...en, ...antdEn} }
 };
i18n.use(initReactI18next).init({
  resources,
  lng: "zh",
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;