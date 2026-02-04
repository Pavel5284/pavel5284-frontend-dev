/**
 * Установить cookie
 */
export const setCookie = (name: string, value: string, days: number = 365): void => {
    if (typeof window === 'undefined') return;

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

/**
 * Получить значение cookie
 */
export const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') return null;

    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

/**
 * Удалить cookie
 */
export const deleteCookie = (name: string): void => {
    if (typeof window === 'undefined') return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}