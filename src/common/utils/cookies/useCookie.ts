import { useEffect, useState, Dispatch, SetStateAction } from "react";
import {getCookie, setCookie} from "@/common/utils/cookies/cookieHelper.ts";

/**
 * Хук для работы с cookies
 */
export const useCookie = (
    key: string,
    defaultValue: string
): [string, Dispatch<SetStateAction<string>>] => {
    const [value, setValue] = useState<string>(() => {
        return getCookie(key) || defaultValue;
    });

    useEffect(() => {
        setCookie(key, value);

        // Dispatch custom event для синхронизации между компонентами
        window.dispatchEvent(new CustomEvent('cookieChange', {
            detail: { key, value }
        }));
    }, [key, value]);

    // Слушаем изменения cookie из других компонентов
    useEffect(() => {
        const handleCookieChange = (e: CustomEvent) => {
            if (e.detail.key === key) {
                setValue(e.detail.value);
            }
        };

        window.addEventListener('cookieChange', handleCookieChange as EventListener);

        return () => {
            window.removeEventListener('cookieChange', handleCookieChange as EventListener);
        };
    }, [key]);

    return [value, setValue];
}