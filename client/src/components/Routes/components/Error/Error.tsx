import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import React from 'react';
import Link from 'src/components/Link';
import Paper from 'src/components/Paper';
import { paths } from 'src/constants';

import { useStyles } from './Error.styles';

interface Props {
  text: string;
}

const ErrorUI: React.FC<Props> = ({ text }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <Paper>
        <Avatar className={classes.avatar}>
          <ErrorOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {text}
        </Typography>
        <Link className={classes.link} to={paths.landing}>
          Home
        </Link>
      </Paper>
    </Container>
  );
};

export default ErrorUI;
