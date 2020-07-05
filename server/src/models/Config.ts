import { Domain } from './Domain';

export class Config extends Domain {
  id!: string;
  value!: string;

  static tableName = 'omscentral_config';

  static jsonSchema = {
    type: 'object',
    required: ['id', 'value'],
    properties: {
      id: { type: 'string' },
      value: { type: 'string' },
    },
  };
}
