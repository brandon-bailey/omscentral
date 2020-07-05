import Knex from 'knex';

export async function alterTable(
  knex: Knex,
  tableName: string,
  callback: (builder: Knex.CreateTableBuilder) => void,
): Promise<void> {
  if (await knex.schema.hasTable(tableName)) {
    await knex.schema.alterTable(tableName, callback);
  }
}
