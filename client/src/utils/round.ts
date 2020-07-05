export default function round(value: number, precision = 0): number {
  const by = Math.pow(10, precision);
  return Math.round(value * by) / by;
}
