import compare from './compare';

describe('utils.compare', () => {
  describe('undefined', () => {
    it('returns 0 operands are both undefined', () => {
      expect(compare()).toEqual(0);
      expect(compare(undefined, undefined)).toEqual(0);
    });

    it('sorts undefined after defined', () => {
      expect(compare('foo', undefined)).toEqual(+1);
      expect(compare(undefined, 'foo')).toEqual(-1);
    });
  });

  describe('boolean', () => {
    it('returns 0 when operands are equal', () => {
      expect(compare(true, true)).toEqual(0);
      expect(compare(false, false)).toEqual(0);
    });

    it('sorts true before false', () => {
      expect(compare(true, false)).toEqual(+1);
      expect(compare(false, true)).toEqual(-1);
    });
  });

  describe('string', () => {
    it('returns 0 when operands are equal', () => {
      expect(compare('ab', 'ab')).toEqual(0);
      expect(compare('zz', 'zz')).toEqual(0);
    });

    it('sorts lexicographically otherwise', () => {
      expect(compare('a', 'b')).toEqual(-1);
      expect(compare('w', 'a')).toEqual(+1);
    });
  });

  describe('number', () => {
    it('returns 0 when operands are equal', () => {
      expect(compare(-1, -1)).toEqual(0);
      expect(compare(+2, +2)).toEqual(0);
    });

    it('sorts in increasing order otherwise', () => {
      expect(compare(10, 20)).toBeLessThan(0);
      expect(compare(30, 18)).toBeGreaterThan(0);
    });
  });
});
