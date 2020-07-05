import Knex from 'knex';

export async function createTable(
  knex: Knex,
  tableName: string,
  callback: (tableBuilder: Knex.CreateTableBuilder) => void,
): Promise<void> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  await knex.schema.createTable(tableName, callback);
}
