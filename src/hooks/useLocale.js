import { useTranslation } from "react-i18next";

const useLocale = () => {
  const translation = useTranslation();
  const { i18n } = translation;
  const { language, changeLanguage } = i18n;

  const dir = i18n.dir();
  const currentLanguage = language;
  const isRtl = dir === "rtl";

  return {
    ...translation,
    dir,
    language,
    currentLanguage,
    isRtl,
    changeLanguage,
  };
};

export default useLocale;
