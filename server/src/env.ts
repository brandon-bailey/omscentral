import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';

import { root } from './constants';

export default module.exports = (file = '.env') => {
  if (process.env.NODE_ENV === 'development') {
    process.env.NODE_ENV = 'local';
  }

  dotenvExpand(
    dotenv.config({
      path: path.join(root, file),
    }),
  );
};
