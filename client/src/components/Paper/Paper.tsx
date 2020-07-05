import React from 'react';

import { useStyles } from './Paper.styles';

const Paper: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.paper}>{children}</div>;
};

export default Paper;
