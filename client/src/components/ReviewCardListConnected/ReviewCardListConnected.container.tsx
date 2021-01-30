import * as sentry from '@sentry/browser';
import qs from 'query-string';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import useQueryParams from 'src/core/hooks/useQueryParams';
import asArray from 'src/core/utils/asArray';
import useSession from 'src/core/utils/useSessionStorage';
import {
  ReviewsQueryVariables,
  useCoursesQuery,
  useReviewsQuery,
  useSemestersQuery,
} from 'src/graphql';

import ReviewCardListConnected, { SortKey } from './ReviewCardListConnected';

interface Props {
  variables?: ReviewsQueryVariables;
  pagination?: boolean;
  before?: JSX.Element;
}

const ReviewCardListConnectedContainer: React.FC<Props> = ({
  variables = {},
  pagination = true,
  before,
}) => {
  const history = useHistory();
  const location = useLocation();

  const params = useQueryParams<{
    course: string[];
    semester: string[];
    sort: SortKey;
  }>();

  const courseFilter = asArray<string>(params.course);
  const semesterFilter = asArray<string>(params.semester);
  const sortKey = params.sort || SortKey.Created;

  const [paginate, setPaginate] = useState(pagination);
  const [limit, setLimit] = useSession('rcl:l', paginate ? 10 : 10e6);

  const [reviews, courses, semesters] = [
    useReviewsQuery({
      variables: {
        ...variables,
        limit,
        order_by_desc: [sortKey, SortKey.Created],
        course_ids: courseFilter.concat(variables.course_ids ?? []),
        semester_ids: semesterFilter,
      },
      fetchPolicy: 'cache-and-network',
    }),
    useCoursesQuery(),
    useSemestersQuery(),
  ];

  const handleLoadMore = async () => {
    if (reviews.loading) {
      return;
    }

    try {
      await reviews.fetchMore({
        variables: {
          offset: reviews.data!.reviews!.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult?.reviews?.length) {
            setPaginate(fetchMoreResult.reviews.length >= limit);
            return {
              ...prev,
              reviews: prev.reviews.concat(fetchMoreResult.reviews),
            };
          } else {
            setPaginate(false);
            return prev;
          }
        },
      });
    } catch (error) {
      sentry.captureException(error, {
        level: sentry.Severity.Error,
        extra: {
          ...variables,
          last_offset: reviews.data?.reviews?.length,
        },
      });
    }
  };

  const handleFilterChange = (key: string) => (filter: string[]) => {
    if (filter.sort().join(',') !== courseFilter.sort().join(',')) {
      setLimit(10);

      history.push({
        search: qs.stringify({
          ...qs.parse(location.search),
          [key]: filter,
        }),
      });
    }
  };

  const handleCourseFilterChange = handleFilterChange('course');
  const handleSemesterFilterChange = handleFilterChange('semester');

  const handleSortKeyChange = (key: SortKey) => {
    if (key !== sortKey) {
      setLimit(10);

      history.push({
        search: qs.stringify({
          ...qs.parse(location.search),
          sort: key,
        }),
      });
    }
  };

  return (
    <ReviewCardListConnected
      loading={reviews.loading || courses.loading || semesters.loading}
      reviews={reviews.data?.reviews}
      courseFilter={courseFilter}
      onCourseFilterChange={handleCourseFilterChange}
      courses={courses.data?.courses}
      semesterFilter={semesterFilter}
      onSemesterFilterChange={handleSemesterFilterChange}
      semesters={semesters.data?.semesters}
      sortKey={sortKey}
      onSortKeyChange={handleSortKeyChange}
      onLoadMore={
        paginate &&
        reviews.data?.reviews?.length &&
        reviews.data.reviews.length >= limit
          ? handleLoadMore
          : undefined
      }
      before={before}
      highlight={(variables.query || '').toLowerCase()}
    />
  );
};

export default ReviewCardListConnectedContainer;
