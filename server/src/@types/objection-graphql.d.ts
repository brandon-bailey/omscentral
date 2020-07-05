declare module 'objection-graphql' {
  import { Model, QueryBuilder } from 'objection';
  import { GraphQLObjectType, GraphQLSchema, GraphQLType } from 'graphql';

  export function builder(): SchemaBuilder;

  interface ModelOptions {
    listFieldName?: string;
    fieldName?: string;
  }

  type ArgFactory = () => {
    [key: string]: {
      type: GraphQLType;
      query: (query: QueryBuilder<Model>, value: any) => QueryBuilder<Model>;
    };
  };

  export class SchemaBuilder {
    model(modelClass: any, opt?: ModelOptions): this;
    extendWithMutations(mutations: GraphQLObjectType | Function): this;
    argFactory(factory: ArgFactory): this;
    build(): GraphQLSchema;
  }
}
