import { ModelObject } from 'objection';

import { Review } from '../models';
import { reviewsIndex } from '../constants';
import { search } from '../components';

export const searchReviews = async ({
  query,
  offset,
  limit,
  sort,
}: {
  query: string;
  offset: number;
  limit: number;
  sort: string[];
}): Promise<string[]> => {
  if (!query) {
    return [];
  }

  const results = await search.searchIndex<ModelObject<Review>>({
    index: reviewsIndex,
    query: { query_string: { query } },
    offset,
    limit,
    sort: sort.map((field) => `${field}:desc`),
  });

  return results.map(({ _source }) => _source.id);
};
