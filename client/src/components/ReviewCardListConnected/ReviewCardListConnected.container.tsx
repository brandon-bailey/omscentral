import React, { useState } from 'react';

import { useReviewsQuery, ReviewsQueryVariables } from 'src/graphql';
import useSession from 'src/utils/useSessionStorage';
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
  const [sortKey, setSortKey] = useSession<SortKey>('rcl:sk', SortKey.Semester);
  const { data, loading, fetchMore } = useReviewsQuery({
    variables: {
      ...variables,
      limit,
      order_by_desc: [sortKey, SortKey.Created],
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleLoadMore = async () => {
    if (loading) {
      return;
    }

    await fetchMore({
      variables: {
        offset: data!.reviews!.length,
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
  };

  const handleSortKeyChange = (key: SortKey) => {
    if (key !== sortKey) {
      setLimit(10);
      setSortKey(key);
    }
  };

  return (
    <ReviewCardListConnected
      loading={loading}
      reviews={data?.reviews}
      sortKey={sortKey}
      onSortKeyChange={handleSortKeyChange}
      onLoadMore={
        paginate && data?.reviews?.length && data.reviews.length >= limit
          ? handleLoadMore
          : undefined
      }
      before={before}
    />
  );
};

export default ReviewCardListConnectedContainer;
