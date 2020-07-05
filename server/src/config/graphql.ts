export interface GraphQLConfig {
  inspector: boolean;
}

export const config: GraphQLConfig = {
  inspector: process.env.OMSCENTRAL_GRAPHQL_INSPECTOR === 'true',
};
