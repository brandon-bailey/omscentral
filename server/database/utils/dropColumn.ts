import Knex from 'knex';

export async function dropColumn(
  knex: Knex,
  tableName: string,
  columnName: string,
): Promise<void> {
  await knex.schema.raw(`
    ALTER TABLE ${tableName}
    DROP COLUMN IF EXISTS "${columnName}"
    CASCADE;
  `);
}
