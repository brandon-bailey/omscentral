import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

import Paper from '../Paper';
import { useStyles } from './Static.styles';

interface Props {
  html: string;
}

const Static: React.FC<Props> = ({ html }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <Paper>
        <Card>
          <CardContent className={classes.cardContent}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default Static;
