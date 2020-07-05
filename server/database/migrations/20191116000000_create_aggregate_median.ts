import Knex from 'knex';

import { logger } from '../../src/components';

exports.up = async (knex: Knex) => {
  try {
    await knex.raw(`
DROP FUNCTION IF EXISTS _final_median(anyarray);
CREATE FUNCTION _final_median(anyarray) RETURNS float8 AS $$
  WITH q AS
  (
    SELECT val
    FROM unnest($1) val
    WHERE VAL IS NOT NULL
    ORDER BY 1
  ),
  cnt AS
  (
    SELECT COUNT(*) AS c FROM q
  )
  SELECT AVG(val)::float8
  FROM
  (
    SELECT val FROM q
    LIMIT  2 - MOD((SELECT c FROM cnt), 2)
    OFFSET GREATEST(CEIL((SELECT c FROM cnt) / 2.0) - 1,0)
  ) q2;
$$ LANGUAGE SQL IMMUTABLE;

DROP AGGREGATE IF EXISTS median(anyelement);
CREATE AGGREGATE median(anyelement) (
  SFUNC=array_append,
  STYPE=anyarray,
  FINALFUNC=_final_median,
  INITCOND='{}'
);
    `);
  } catch (error) {
    logger.error(error);
  }
};

exports.down = async (knex: Knex) => {
  try {
    await knex.raw(`
DROP AGGREGATE median(anyelement);
DROP FUNCTION _final_median(anyarray);
    `);
  } catch (error) {
    logger.error(error);
  }
};
