import { flatMap } from 'lodash';

import { Review } from '../models';
import { reviewsIndex } from '../constants';
import { search } from '../components';

export const indexReviews = async (): Promise<void> => {
  if (await search.indexExists(reviewsIndex)) {
    return search.refreshIndex(reviewsIndex);
  }

  await search.createIndex(reviewsIndex, {
    properties: {
      id: { type: 'keyword' },
      body: { type: 'text' },
      course_id: { type: 'keyword' },
      course: {
        properties: {
          id: { type: 'keyword' },
          department: { type: 'keyword' },
          number: { type: 'keyword' },
          name: { type: 'text' },
          foundational: { type: 'boolean' },
          deprecated: { type: 'boolean' },
        },
      },
      semester_id: { type: 'keyword' },
      semester: {
        properties: {
          year: { type: 'keyword' },
          name: { type: 'text' },
        },
      },
    },
  });

  await search.client.bulk({
    refresh: true,
    body: flatMap(await Review.eagerQuery(), (review) => [
      {
        index: {
          _index: reviewsIndex,
        },
      },
      review.toJSON(),
    ]),
  });
};

export const indexReview = async (
  review: Review,
  mode: 'create' | 'update',
): Promise<void> => {
  const doc = review.toJSON();
  if (mode === 'create') {
    await search.createDocument(reviewsIndex, doc);
  } else {
    await search.updateDocument(reviewsIndex, { term: { id: review.id } }, doc);
  }
};

export const unindexReview = async (review: Review): Promise<void> => {
  await search.deleteDocument(reviewsIndex, { term: { id: review.id } });
};
