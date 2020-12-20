import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(0, 0, 2, 0),
  },
  specializations: {
    minWidth: '100%',
  },
  filter: {
    minWidth: '100%',
  },
}));
