import Knex from 'knex';

export async function dropTable(knex: Knex, tableName: string): Promise<void> {
  await knex.schema.raw(`
    DROP TABLE IF EXISTS ${tableName}
    CASCADE;
  `);
}
