import { Domain } from './Domain';

export class MigrationLock extends Domain {
  index!: number;
  is_locked!: 0 | 1;

  static tableName = 'omscentral_migration_lock';
}
