import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      paddingTop: theme.spacing(8),
    },
  },
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2),
  },
}));
