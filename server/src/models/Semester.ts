import { Season } from '../enums';
import { Domain } from './Domain';

export class Semester extends Domain {
  id!: string;
  year!: number;
  season!: Season;
  name!: string;

  static tableName = 'omscentral_semester';

  static jsonSchema = {
    type: 'object',
    required: ['id', 'year', 'season', 'name'],
    properties: {
      id: { type: 'string' },
      year: { type: 'integer' },
      season: { type: 'integer' },
      name: { type: 'string' },
    },
  };
}
