import * as sentry from '@sentry/browser';
import React, { useState } from 'react';
import useSession from 'src/core/utils/useSessionStorage';
import {
  ReviewsQueryVariables,
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
  const [paginate, setPaginate] = useState(pagination);
  const [limit, setLimit] = useSession<number>('rcl:l', paginate ? 10 : 10e6);
  const [semesterFilter, setSemesterFilter] = useState<string[]>([]);
  const [sortKey, setSortKey] = useSession<SortKey>('rcl:sk', SortKey.Semester);

  const [reviews, semesters] = [
    useReviewsQuery({
      variables: {
        ...variables,
        limit,
        order_by_desc: [sortKey, SortKey.Created],
        semester_ids: semesterFilter,
      },
      fetchPolicy: 'cache-and-network',
    }),
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

  const handleSemesterFilterChange = (filter: string[]) => {
    if (filter.sort().join(',') !== semesterFilter.sort().join(',')) {
      setLimit(10);
      setSemesterFilter(filter);
    }
  };

  const handleSortKeyChange = (key: SortKey) => {
    if (key !== sortKey) {
      setLimit(10);
      setSortKey(key);
    }
  };

  return (
    <ReviewCardListConnected
      loading={reviews.loading || semesters.loading}
      reviews={reviews.data?.reviews}
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
