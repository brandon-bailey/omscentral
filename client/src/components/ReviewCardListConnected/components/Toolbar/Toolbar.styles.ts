import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ml: {
    marginLeft: theme.spacing(1),
  },
  mr: {
    marginRight: theme.spacing(1),
  },
  mx: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  bold: {
    fontWeight: 'bolder',
  },
}));
