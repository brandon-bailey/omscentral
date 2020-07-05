# omscentral-graphql

GraphQL schema, queries, and mutations for [omscentral.com](https://omscentral.com).

## Tech

- [graphql](https://graphql.org/)
- [graphql code generator](https://graphql-code-generator.com/)

## Getting Started

Install dependencies:

```sh
npm ci
```

## Start

To generate GraphQL artifacts needed by other projects in monorepo:

```sh
npm run generate
```

To also regenerate them whenever the `.graphql` files in this project change:

```sh
npm run dev
```

`./codegen.yml` contains the code generation configuration.

## Extending Schema

Update `./schema.graphql` as needed, and the TypeScript types will be generated for `../server`.

## Adding Queries & Mutations

Create or update files under `./Query` and `./Mutation` directories, and the react hooks will be generated for `../client`.
