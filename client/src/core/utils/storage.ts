const isSupported = (storage: Storage): boolean => {
  const x = '__omscentral__';
  try {
    storage.setItem(x, x);
    storage.getItem(x);
    storage.removeItem(x);
    return true;
  } catch {
    return false;
  }
};

const isLocalStorageSupported = isSupported(window.localStorage);
const isSessionStorageSupported = isSupported(window.sessionStorage);

class InMemoryStorage implements Storage {
  private items: Map<string, string> = new Map();

  get length() {
    return this.items.size;
  }

  clear(): void {
    this.items.clear();
  }

  getItem(key: string): string | null {
    return this.items.has(key) ? this.items.get(key)! : null;
  }

  key(/* index: number */): string | null {
    throw new Error('NOT_IMPLEMENTED');
  }

  removeItem(key: string): void {
    this.items.has(key) && this.items.delete(key);
  }

  setItem(key: string, value: string): void {
    this.items.set(key, value);
  }
}

const inMemoryStorage = new InMemoryStorage();

const storage = (preferredType?: 'local' | 'session' | 'memory'): Storage => {
  if (preferredType === 'local' && isLocalStorageSupported) {
    return window.localStorage;
  }

  if (preferredType === 'session' && isSessionStorageSupported) {
    return window.sessionStorage;
  }

  return inMemoryStorage;
};

export default storage;
