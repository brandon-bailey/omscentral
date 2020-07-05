import React from 'react';

import { ReviewsQuery } from 'src/graphql';
import ReviewCardList from '../ReviewCardList';
import Visibility from '../Visibility';
import Toolbar, { SortKey } from './components/Toolbar';

export { SortKey };

interface Props {
  reviews?: ReviewsQuery['reviews'];
  sortKey: SortKey;
  onSortKeyChange: (key: SortKey) => void;
  onLoadMore?: () => void;
  loading?: boolean;
  before?: JSX.Element;
}

const ReviewCardListConnected: React.FC<Props> = ({
  reviews,
  sortKey,
  onSortKeyChange,
  onLoadMore,
  loading,
  before,
}) => (
  <ReviewCardList
    loading={loading}
    reviews={reviews}
    before={
      <>
        {before}
        <Toolbar sortKey={sortKey} onSortKeyChange={onSortKeyChange} />
      </>
    }
    after={<Visibility onVisible={onLoadMore} />}
  />
);

export default ReviewCardListConnected;
