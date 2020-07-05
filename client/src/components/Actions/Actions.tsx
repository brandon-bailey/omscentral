import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import BarChartIcon from '@material-ui/icons/BarChart';
import EditIcon from '@material-ui/icons/Edit';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

import { paths } from 'src/constants';
import { AuthContext } from '../Auth';
import { useStyles } from './Actions.styles';

enum ActionKey {
  CreateReview = 'create-review',
  OpenTableau = 'open-tableau',
}

interface Action {
  key: ActionKey;
  auth?: boolean;
  name: string;
  icon: JSX.Element;
}

const actions: Action[] = [
  {
    key: ActionKey.CreateReview,
    auth: true,
    name: 'Create Review',
    icon: <EditIcon />,
  },
  {
    key: ActionKey.OpenTableau,
    name: 'Tableau Grade Reports',
    icon: <BarChartIcon />,
  },
];

const Actions: React.FC = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (key: ActionKey) => () => {
    setOpen(false);
    switch (key) {
      case ActionKey.CreateReview:
        return history.push(paths.review.create);
      case ActionKey.OpenTableau:
        return window.open('https://tableau.gatech.edu');
      default:
        return;
    }
  };

  const available = actions.filter(
    (action) => !action.auth || auth.authenticated,
  );

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="actions"
        icon={<SpeedDialIcon />}
        direction="up"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        {available.map(({ key, icon, name }) => (
          <SpeedDialAction
            key={key}
            icon={icon}
            tooltipTitle={name}
            onClick={handleClick(key)}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default Actions;
