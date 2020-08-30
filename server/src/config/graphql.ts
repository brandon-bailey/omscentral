export interface GraphQLConfig {
  playground: boolean;
  reportSchema: boolean;
}

export const config: GraphQLConfig = {
  playground: process.env.OMSCENTRAL_GRAPHQL_PLAYGROUND === 'true',
  reportSchema: process.env.OMSCENTRAL_GRAPHQL_REPORT_SCHEMA === 'true',
};
