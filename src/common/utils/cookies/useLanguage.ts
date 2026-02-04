import { Dispatch, SetStateAction } from "react";
import { useCookie } from "./useCookie";
import {getCookie} from "@/common/utils/cookies/cookieHelper.ts";

// Список поддерживаемых языков
export const SUPPORTED_LANGUAGES = ['en', 'ru'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

/**
 * Определить язык (из cookie или браузера)
 */
export const detectLanguage = (): string => {
    if (typeof window === 'undefined') return 'ru';

    // Сначала проверяем cookie
    const savedLang = getCookie('language');
    if (savedLang) {
        return savedLang;
    }

    // Получаем язык браузера
    const browserLang = navigator.language || (navigator as any).userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();

    return SUPPORTED_LANGUAGES.includes(langCode as Language) ? langCode : 'ru';
}

/**
 * Хук для работы с языком
 */
export const useLanguage = (): [string, Dispatch<SetStateAction<string>>] => {
    const defaultLanguage = detectLanguage();
    return useCookie('language', defaultLanguage);
}