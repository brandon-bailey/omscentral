interface Comparator {
  (a?: boolean, b?: boolean): number;
  (a?: string, b?: string): number;
  (a?: number, b?: number): number;
}

const compare: Comparator = (
  a?: boolean | string | number,
  b?: boolean | string | number,
): number => {
  const aIsUndefined = typeof a === 'undefined';
  const bIsUndefined = typeof b === 'undefined';
  if (aIsUndefined || bIsUndefined) {
    return aIsUndefined && bIsUndefined ? 0 : aIsUndefined ? -1 : +1;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  return String(a).localeCompare(String(b));
};

export default compare;
