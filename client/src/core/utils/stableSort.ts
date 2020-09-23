export default function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stablized: [T, number][] = array.map((el, index) => [el, index]);

  stablized.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stablized.map((el) => el[0]);
}
