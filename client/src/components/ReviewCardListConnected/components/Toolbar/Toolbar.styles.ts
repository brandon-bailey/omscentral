import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortBy: {
    marginRight: theme.spacing(1),
  },
  bold: {
    fontWeight: 'bolder',
  },
}));
