import { Client } from '@elastic/elasticsearch';
import { RequestNDBody } from '@elastic/elasticsearch/lib/Transport';

import { searchConfig } from '../../config';

export const client = searchConfig.host
  ? new Client({ node: searchConfig.host })
  : null;

export const indexExists = async (index: string): Promise<boolean> => {
  if (client == null) return false;

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const { body } = await client.indices.exists({ index });
  return Boolean(body);
};

export const refreshIndex = async (index: string): Promise<void> => {
  if (client == null) return;

  await client.indices.refresh({ index });
};

export const createIndex = async <TMappings = any>(
  index: string,
  mappings: TMappings,
): Promise<void> => {
  if (client == null) return;

  await client.indices.create({
    index,
    body: {
      mappings,
    },
  });
};

export const bulkIndex = async ({
  body,
}: {
  body: RequestNDBody;
}): Promise<void> => {
  if (client == null) return;

  await client.bulk({
    refresh: true,
    body,
  });
};

export const searchIndex = async <TSource = any>({
  index,
  query,
  offset,
  limit,
  sort,
}: {
  index: string;
  query: any;
  offset?: number;
  limit?: number;
  sort?: string[];
}): Promise<
  {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: TSource;
  }[]
> => {
  if (client == null) return [];

  const { body } = await client.search({
    index,
    body: {
      query,
    },
    from: offset,
    size: limit,
    sort,
  });

  return body.hits.hits;
};

export const createDocument = async <T>(
  index: string,
  body: T,
): Promise<void> => {
  if (client == null) return;

  await client.index({
    index,
    body,
    refresh: true,
  });
};

export const updateDocument = async <TBody, TQuery = any>(
  index: string,
  query: TQuery,
  body: TBody,
): Promise<void> => {
  if (client == null) return;

  const [doc] = await searchIndex({ index, query });
  if (doc) {
    await client.update({
      index,
      id: doc._id,
      body: {
        doc: body,
      },
      refresh: true,
    });
  }
};
export const deleteDocument = async <TQuery = any>(
  index: string,
  query: TQuery,
): Promise<void> => {
  if (client == null) return;

  const [doc] = await searchIndex({ index, query });
  if (doc) {
    await client.delete({
      index,
      id: doc._id,
      refresh: true,
    });
  }
};
