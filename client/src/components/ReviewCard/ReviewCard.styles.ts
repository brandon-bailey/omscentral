import { makeStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

export const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    padding: theme.spacing(2),
  },
  avatar: {
    backgroundColor: red[500],
  },
  header: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  actions: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  fall: {
    color: theme.palette.getContrastText(brown[400]),
    backgroundColor: brown[400],
  },
  spring: {
    color: theme.palette.getContrastText(green[200]),
    backgroundColor: green[200],
  },
  summer: {
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[500],
  },
  ...[
    [1, green[900]],
    [2, green[400]],
    [3, orange[200]],
    [4, orange[600]],
    [5, red[700]],
  ].reduce(
    (css, [value, color]) => ({
      ...css,
      [`difficulty${value}`]: {
        color,
        borderColor: color,
      },
    }),
    {},
  ),
  ...[
    [5, green[900]],
    [4, green[400]],
    [3, orange[200]],
    [2, orange[600]],
    [1, red[700]],
  ].reduce(
    (css, [value, color]) => ({
      ...css,
      [`rating${value}`]: {
        color,
        borderColor: color,
      },
    }),
    {},
  ),
}));
