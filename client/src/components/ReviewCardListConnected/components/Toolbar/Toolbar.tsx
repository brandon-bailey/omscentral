import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import React from 'react';
import Grow from 'src/components/Grow';
import Menu from 'src/components/Menu';
import useModalState from 'src/core/hooks/useModalState';
import { Option } from 'src/core/types';

import FilterModal from '../FilterModal';
import { useStyles } from './Toolbar.styles';

export enum SortKey {
  Created = 'created',
  Semester = 'semester_id',
}

interface Props {
  semesterFilter: string[];
  semesterFilterOptions: Option[];
  onSemesterFilterChange: (filter: string[]) => void;
  sortKey: SortKey;
  sortKeyOptions: Option<SortKey>[];
  onSortKeyChange: (key: SortKey) => void;
  message?: string;
}

const Toolbar: React.FC<Props> = ({
  semesterFilter,
  semesterFilterOptions,
  onSemesterFilterChange,
  sortKey,
  sortKeyOptions,
  onSortKeyChange,
  message,
}) => {
  const classes = useStyles();

  const {
    isShown: isSemesterFilterShown,
    onShow: showSemesterFilter,
    onHide: hideSemesterFilter,
  } = useModalState(false);

  const handleSemesterFilterChange = (options: Option[]) => {
    onSemesterFilterChange(options.map((option) => option.value));
    hideSemesterFilter();
  };

  return (
    <div className={classes.toolbar}>
      {message && <Typography variant="body2">{message}</Typography>}
      <Grow />
      <Typography variant="body2">Semesters:</Typography>
      <IconButton onClick={showSemesterFilter} className={classes.mx}>
        <DateRangeIcon fontSize="small" />
      </IconButton>

      {isSemesterFilterShown && (
        <FilterModal
          title="Semester Filter"
          options={semesterFilterOptions}
          initialValue={semesterFilter}
          onCancel={hideSemesterFilter}
          onOk={handleSemesterFilterChange}
        />
      )}

      <Typography variant="body2" className={classes.mr}>
        Sort by:
      </Typography>
      <Menu
        id="sort_by"
        icon={<ImportExportIcon fontSize="small" />}
        items={sortKeyOptions.map(({ value, label }) => ({
          key: value,
          onClick: () => onSortKeyChange(value),
          caption: (
            <Typography
              className={sortKey === value ? classes.bold : undefined}
              data-cy={`sort_by:${value}`}
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
