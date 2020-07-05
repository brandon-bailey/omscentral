import React from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { paths } from 'src/constants';
import Button from 'src/components/Button';
import Link from 'src/components/Link';
import Paper from 'src/components/Paper';
import White from 'src/components/White';
import { useStyles } from './Register.styles';

export type FormData = {
  email: string;
  password: string;
};

interface Props {
  disabled?: boolean;
  onSubmit: (form: FormData) => void;
}

const Register: React.FC<Props> = ({ disabled, onSubmit }) => {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm<FormData>();

  return (
    <Container component="main" maxWidth="xs">
      <White />
      <Paper>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                autoComplete="email"
                variant="outlined"
                fullWidth
                required
                disabled={disabled}
                inputRef={register({
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address.',
                  },
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                required
                disabled={disabled}
                inputRef={register({
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'Must be at least 8 characters.',
                  },
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth disabled={disabled}>
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={paths.login}>Already have an account? Login</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
