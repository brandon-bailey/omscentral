import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './Loading.styles';

const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <CircularProgress />
      </CardContent>
    </Card>
  );
};

export default Loading;
