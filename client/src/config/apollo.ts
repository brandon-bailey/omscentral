export interface ApolloConfig {
  uri: string;
}

export const config: ApolloConfig = {
  uri: process.env.REACT_APP_API_URI!,
};
