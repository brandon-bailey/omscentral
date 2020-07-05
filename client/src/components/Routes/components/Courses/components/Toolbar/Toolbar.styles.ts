import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 0, 2, 1),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  switch: {
    marginRight: theme.spacing(4),
  },
  filter: {
    minWidth: 360,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
}));
