import { Domain } from './Domain';

export class Migration extends Domain {
  id!: number;
  name!: string;
  batch!: number;
  migration_time!: number;

  static tableName = 'omscentral_migration';
}
