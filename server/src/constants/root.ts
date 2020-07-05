import path from 'path';

const dist = `dist${path.sep}`;

export const root = path.join(
  __dirname,
  ...new Array(__dirname.includes(dist) ? 3 : 2).fill('..'),
);
