import React from 'react';
import { CoursesQuery, ReviewsQuery, SemestersQuery } from 'src/graphql';

import ReviewCardList from '../ReviewCardList';
import Visibility from '../Visibility';
import Toolbar, { SortKey } from './components/Toolbar';

export { SortKey };

const sortKeyOptions = [
  { value: SortKey.Semester, label: 'Semester' },
  { value: SortKey.Created, label: 'Created' },
];
interface Props {
  reviews?: ReviewsQuery['reviews'];
  courseFilter?: string[];
  onCourseFilterChange: (filter: string[]) => void;
  courses?: CoursesQuery['courses'];
  semesterFilter?: string[];
  onSemesterFilterChange: (filter: string[]) => void;
  semesters?: SemestersQuery['semesters'];
  sortKey: SortKey;
  onSortKeyChange: (key: SortKey) => void;
  onLoadMore?: () => void;
  loading?: boolean;
  before?: JSX.Element;
  highlight?: string;
}

const ReviewCardListConnected: React.FC<Props> = ({
  reviews,
  courseFilter = [],
  onCourseFilterChange,
  courses,
  semesterFilter = [],
  onSemesterFilterChange,
  semesters,
  sortKey,
  onSortKeyChange,
  onLoadMore,
  loading,
  before,
  highlight,
}) => (
  <ReviewCardList
    loading={loading}
    reviews={reviews}
    highlight={highlight}
    before={
      <>
        {before}
        <Toolbar
          courseFilter={courseFilter}
          courseFilterOptions={
            courses?.map((course) => ({
              value: course.id,
              label: `${course.id} ${course.name}`,
            })) || []
          }
          onCourseFilterChange={onCourseFilterChange}
          semesterFilter={semesterFilter}
          semesterFilterOptions={
            semesters?.map((semester) => ({
              value: semester.id,
              label: semester.name,
            })) || []
          }
          onSemesterFilterChange={onSemesterFilterChange}
          sortKey={sortKey}
          sortKeyOptions={sortKeyOptions}
          onSortKeyChange={onSortKeyChange}
        />
      </>
    }
    after={<Visibility onVisible={onLoadMore} />}
  />
);

export default ReviewCardListConnected;
