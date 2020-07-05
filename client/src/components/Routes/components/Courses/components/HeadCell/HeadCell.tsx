import React from 'react';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './HeadCell.styles';

export enum SortKey {
  Id = 'id',
  Name = 'name',
  Foundational = 'foundational',
  Deprecated = 'deprecated',
  Reviews = 'reviews',
  Difficulty = 'difficulty',
  Workload = 'workload',
  Rating = 'rating',
}

export const cells = [
  SortKey.Id,
  SortKey.Name,
  // SortKey.Foundational,
  // SortKey.Deprecated,
  SortKey.Reviews,
  SortKey.Difficulty,
  SortKey.Workload,
  SortKey.Rating,
];

export type SortDirection = 'asc' | 'desc';

const config: {
  [key in SortKey]: {
    label: string;
    tooltip?: string;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    width?: number;
    className?: string;
  };
} = {
  [SortKey.Id]: {
    label: 'ID',
    width: 160,
  },
  [SortKey.Name]: {
    label: 'Name',
    className: 'name',
  },
  [SortKey.Foundational]: {
    label: 'Foundational?',
    align: 'center',
    width: 160,
  },
  [SortKey.Deprecated]: {
    label: 'Deprecated?',
    align: 'center',
    width: 160,
  },
  [SortKey.Reviews]: {
    label: 'Reviews',
    align: 'center',
    width: 160,
  },
  [SortKey.Difficulty]: {
    label: 'Difficulty (1-5)',
    tooltip: '1-Very Easy, 5-Very Hard',
    align: 'center',
    width: 160,
  },
  [SortKey.Workload]: {
    label: 'Workload (hrs/wk)',
    align: 'center',
    width: 160,
  },
  [SortKey.Rating]: {
    label: 'Rating (1-5)',
    tooltip: '1-Strongly Disliked, 5-Strongly Liked',
    align: 'center',
    width: 160,
  },
};

interface Props {
  id: SortKey;
  orderBy: SortKey;
  order: SortDirection;
}

const HeadCell: React.FC<TableCellProps & Props> = ({
  id,
  orderBy,
  order,
  onClick,
  ...rest
}) => {
  const classes = useStyles();
  const { align, width, className, label, tooltip } = config[id];
  const active = id === orderBy;
  const shouldTruncate = active && label.length > 5;
  const adjustedLabel = shouldTruncate ? label.substr(0, 5) + '...' : label;

  return (
    <TableCell
      sortDirection={orderBy === id ? order : false}
      {...rest}
      align={align}
      style={{ width }}
      className={className && (classes as any)[className]}
    >
      <TableSortLabel
        active={active}
        direction={order}
        onClick={onClick}
        hideSortIcon
      >
        {tooltip ? (
          <Tooltip title={tooltip} placement="top">
            <span>{adjustedLabel}</span>
          </Tooltip>
        ) : (
          adjustedLabel
        )}
      </TableSortLabel>
    </TableCell>
  );
};

export default HeadCell;
