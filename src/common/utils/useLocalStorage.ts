import { useEffect, useState, Dispatch, SetStateAction } from "react";

const getStorageValue = (key: string, defaultValue: string): string => {
    if (typeof window === 'undefined') return defaultValue;

    try {
        const saved = localStorage.getItem(key);
        if (saved !== null) {
            return JSON.parse(saved);
        }
        return defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

export const useLocalStorage = (
    key: string,
    defaultValue: string
): [string, Dispatch<SetStateAction<string>>] => {
    const [value, setValue] = useState<string>(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            // Dispatch custom event для синхронизации между компонентами
            window.dispatchEvent(new StorageEvent('storage', {
                key: key,
                newValue: JSON.stringify(value),
                storageArea: localStorage
            }));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }, [key, value]);

    // Слушаем изменения localStorage
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    const newValue = JSON.parse(e.newValue);
                    setValue(newValue);
                } catch (error) {
                    console.error('Error parsing storage value:', error);
                }
            }
        };

        // Слушаем события из других вкладок и из текущей вкладки
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    return [value, setValue];
}