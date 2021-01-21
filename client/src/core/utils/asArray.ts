const asArray = <T>(value: T | T[] | void | null): T[] => {
  if (value == null) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
};

export default asArray;
