import { Dispatch, SetStateAction } from "react";
import { useCookie } from "./useCookie";
import {getCookie} from "@/common/utils/cookies/cookieHelper.ts";

export type Theme = 'dark' | 'light';

/**
 * Определить тему (из cookie или системных настроек)
 */
export const detectDarkMode = (): Theme => {
    if (typeof window === 'undefined') return 'light';

    // Сначала проверяем cookie
    const savedTheme = getCookie('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }

    // Если в cookie нет, проверяем системные настройки
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
}

/**
 * Хук для работы с темой
 */
export const useTheme = (): [Theme, Dispatch<SetStateAction<Theme>>] => {
    const defaultTheme = detectDarkMode();
    return useCookie('theme', defaultTheme) as [Theme, Dispatch<SetStateAction<Theme>>];
}