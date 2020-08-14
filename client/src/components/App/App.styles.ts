import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  routes: {
    margin: theme.spacing(3),
    overflowX: 'scroll',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));
