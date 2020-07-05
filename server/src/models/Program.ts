import { Domain } from './Domain';

export class Program extends Domain {
  id!: string;
  name!: string;
  url!: string;

  static tableName = 'omscentral_program';

  static jsonSchema = {
    type: 'object',
    required: ['id', 'name', 'url'],
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      url: { type: 'string' },
    },
  };
}
