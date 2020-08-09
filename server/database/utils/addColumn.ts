import Knex from 'knex';

export async function addColumn(
  knex: Knex,
  tableName: string,
  columnName: string,
  callback: (builder: Knex.AlterTableBuilder) => any,
): Promise<void> {
  if (await knex.schema.hasColumn(tableName, columnName)) {
    return;
  }
  await knex.schema.table(tableName, callback);
}
