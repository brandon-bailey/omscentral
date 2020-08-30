import storage from './storage';
import useStorage from './useStorage';

export default function useSessionStorage<T = any>(
  key: string,
  initialValue: T,
) {
  return useStorage<T>(key, initialValue, storage('local'));
}
