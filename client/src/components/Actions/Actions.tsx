import BarChartIcon from '@material-ui/icons/BarChart';
import BugReportIcon from '@material-ui/icons/BugReport';
import EditIcon from '@material-ui/icons/Edit';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { paths } from 'src/constants';

import { AuthContext } from '../Auth';
import { useStyles } from './Actions.styles';

enum ActionKey {
  CreateReview = 'create_review',
  OpenTableau = 'open_tableau',
  ReportIssue = 'report_issue',
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
  {
    key: ActionKey.ReportIssue,
    name: 'Report Issue',
    icon: <BugReportIcon />,
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
      case ActionKey.ReportIssue:
        return window.open('https://github.com/OMSCentral/omscentral/issues');
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
        data-cy="actions"
        ariaLabel="actions"
        icon={<SpeedDialIcon />}
        direction="up"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        {available.map(({ key, icon, name }) => (
          <SpeedDialAction
            data-cy={`action:${key}`}
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
