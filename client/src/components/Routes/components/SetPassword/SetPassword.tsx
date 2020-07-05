import React from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '../../../Button';
import Link from '../../../Link';
import Paper from '../../../Paper';
import White from '../../../White';
import { Nullable } from 'src/core';
import { paths } from 'src/constants';
import { useStyles } from './SetPassword.styles';

export type FormData = {
  password: string;
};

interface Props {
  email: Nullable<string>;
  disabled?: boolean;
  onSubmit: (form: FormData) => void;
}

const SetPassword: React.FC<Props> = ({ email, disabled, onSubmit }) => {
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
          Set Password
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
                disabled
                value={email || '...'}
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
            Set Password
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={paths.resetPassword}>Need another link?</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SetPassword;
