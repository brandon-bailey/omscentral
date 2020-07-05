import { makeStyles } from '@material-ui/core/styles';

const size = 12;

export const useStyles = makeStyles((theme) => ({
  card: {
    position: 'absolute',
    top: `calc(100vh / 2 - ${theme.spacing(8 + size / 2)}px)`,
    left: `calc(100vw / 2 - ${theme.spacing(size / 2)}px)`,
    width: theme.spacing(size),
    textAlign: 'center',
  },
  cardContent: {
    padding: theme.spacing(3),
  },
}));
