import { PartialModelObject as PMO } from 'objection';

import { Config } from '../../src/models';
import { privacy, terms } from '../constants';

export const configs: PMO<Config>[] = [
  {
    id: 'privacy',
    value: privacy,
  },
  {
    id: 'terms',
    value: terms,
  },
];
