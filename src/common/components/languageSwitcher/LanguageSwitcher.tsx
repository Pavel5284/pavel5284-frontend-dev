import style from './LanguageSwitcher.module.css'
import {useTranslation} from "react-i18next";
import {useLanguage} from "@/common/utils/cookies/useLanguage.ts";
import {useEffect} from "react";

export const LanguageSwitcher = () => {
    const {i18n} = useTranslation();
    const [language, setLanguage] = useLanguage();

    useEffect(() => {
        if (language && i18n.language !== language) {
            i18n.changeLanguage(language);
        }
    }, [language, i18n]);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ru' ? 'en' : 'ru';
        i18n.changeLanguage(newLang);
        setLanguage(newLang);
    };

    return (
        <button onClick={toggleLanguage} className={style.langBtn}>
            {i18n.language === 'ru' ? 'EN' : 'RU'}
        </button>
    )
}