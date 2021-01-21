import Typography from '@material-ui/core/Typography';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import React from 'react';
import Grow from 'src/components/Grow';
import Menu from 'src/components/Menu';

import { useStyles } from './Toolbar.styles';

export enum SortKey {
  Created = 'created',
  Semester = 'semester_id',
}

interface Props {
  sortKey: SortKey;
  onSortKeyChange: (key: SortKey) => void;
  message?: string;
}

const Toolbar: React.FC<Props> = ({ sortKey, onSortKeyChange, message }) => {
  const classes = useStyles();

  const items: [SortKey, string][] = [
    [SortKey.Semester, 'Semester'],
    [SortKey.Created, 'Created'],
  ];

  return (
    <div className={classes.toolbar}>
      {message && <Typography variant="body2">{message}</Typography>}
      <Grow />
      <Typography variant="body2" className={classes.sortBy}>
        Sort by:
      </Typography>
      <Menu
        id="sort_by"
        icon={<ImportExportIcon fontSize="small" />}
        items={items.map(([key, label]) => ({
          key,
          onClick: () => onSortKeyChange(key),
          caption: (
            <Typography
              className={sortKey === key ? classes.bold : undefined}
              data-cy={`sort_by:${key}`}
            >
              {label}
            </Typography>
          ),
        }))}
      />
    </div>
  );
};

export default Toolbar;
