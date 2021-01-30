import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import React from 'react';
import Grow from 'src/components/Grow';
import Menu from 'src/components/Menu';
import useModalState from 'src/core/hooks/useModalState';
import { Option, ReviewSortKey as SortKey } from 'src/core/types';

import FilterModal from '../FilterModal';
import { useStyles } from './Toolbar.styles';

export interface Props {
  courseFilter: string[];
  courseFilterOptions: Option[];
  onCourseFilterChange: (filter: string[]) => void;
  semesterFilter: string[];
  semesterFilterOptions: Option[];
  onSemesterFilterChange: (filter: string[]) => void;
  sortKey: SortKey;
  sortKeyOptions: Option<SortKey>[];
  onSortKeyChange: (key: SortKey) => void;
  message?: string;
}

const Toolbar: React.FC<Props> = ({
  courseFilter,
  courseFilterOptions,
  onCourseFilterChange,
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
    isShown: isCourseFilterShown,
    onShow: showCourseFilter,
    onHide: hideCourseFilter,
  } = useModalState(false);

  const {
    isShown: isSemesterFilterShown,
    onShow: showSemesterFilter,
    onHide: hideSemesterFilter,
  } = useModalState(false);

  const handleCourseFilterChange = (options: Option[]) => {
    onCourseFilterChange(options.map((option) => option.value));
    hideCourseFilter();
  };

  const handleSemesterFilterChange = (options: Option[]) => {
    onSemesterFilterChange(options.map((option) => option.value));
    hideSemesterFilter();
  };

  return (
    <div className={classes.toolbar}>
      {message && <Typography variant="body2">{message}</Typography>}
      <Grow />
      <Typography variant="body2">Courses:</Typography>
      <IconButton onClick={showCourseFilter} className={classes.mx}>
        <DateRangeIcon fontSize="small" />
      </IconButton>

      {isCourseFilterShown && (
        <FilterModal
          title="Course Filter"
          options={courseFilterOptions}
          initialValue={courseFilter}
          onCancel={hideCourseFilter}
          onOk={handleCourseFilterChange}
        />
      )}

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
