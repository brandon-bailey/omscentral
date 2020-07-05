import useStorage from './useStorage';

export default function useSessionStorage<T = any>(
  key: string,
  initialValue: T,
) {
  return useStorage<T>(key, initialValue, window.sessionStorage);
}
