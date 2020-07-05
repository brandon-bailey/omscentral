import { Model, compose } from 'objection';
import { DbErrors } from 'objection-db-errors';
import Visibility from 'objection-visibility';

const withPlugins = compose(DbErrors, Visibility);

export class Domain extends withPlugins(Model) {
  static jsonSchema = {};
}
