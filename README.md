# omscentral

Monorepo for [omscentral.com](https://omscentral.com) containing the following projects:

- [GraphQL](./graphql/README.md)
- [Server](./server/README.md)
- [Client](./client/README.md)

## Getting Started

To install top-level dependencies:

```sh
npm ci
```

Before proceeding, follow the instructions in project-specific READMEs in the order above (graphql, server, then client).

## Scripts

### `npm run format`

Formats all source code and package.json.

### `npm test`

Tests services.

### `npm run dev`

Starts services in development mode w/hot-reload.

### `npm run build`

Builds services.

### `npm start`

Starts services in production mode. Note: You must run `npm run build` first.
