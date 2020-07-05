import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import apollo from 'src/data/apollo';

const Apollo: React.FC = ({ children }) => (
  <ApolloProvider client={apollo}>{children}</ApolloProvider>
);

export default Apollo;
