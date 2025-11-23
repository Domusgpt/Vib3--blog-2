const canUseStorage = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function loadState<T>(key: string, fallback: T): T {
    if (!canUseStorage) return fallback;
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    try {
        return JSON.parse(raw) as T;
    } catch (error) {
        console.warn('Failed to parse local state', key, error);
        return fallback;
    }
}

export function saveState(key: string, value: unknown) {
    if (!canUseStorage) return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn('Failed to persist local state', key, error);
    }
}
