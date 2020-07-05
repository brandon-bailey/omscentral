import React from 'react';

const Debug: React.FC = ({ children }) => (
  <pre>{JSON.stringify(children, null, 2)}</pre>
);

export default Debug;
