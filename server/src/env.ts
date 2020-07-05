import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';

import { root } from './constants';

export default module.exports = (file = '.env') => {
  dotenvExpand(
    dotenv.config({
      path: path.join(root, file),
    }),
  );
};
