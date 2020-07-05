import { useState } from 'react';

export default function useStorage<T = any>(
  key: string,
  initialValue: T,
  storage: Storage,
): [T, (value: T) => void] {
  const internalKey = `omscentral:${key}`;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.getItem(internalKey);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        typeof value === 'function' ? value(storedValue) : value;
      setStoredValue(valueToStore);
      storage.setItem(internalKey, JSON.stringify(valueToStore));
    } catch {
      // silently fail
    }
  };

  return [storedValue, setValue];
}
