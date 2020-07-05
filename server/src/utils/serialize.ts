import { chunk } from 'lodash';
import { mapSeries } from 'bluebird';

export const serialize: <T>(
  values: T[],
  operation: (chunk: T[]) => Promise<any>,
  size?: number,
  timeout?: number,
) => Promise<any> = (values, operation, size = 1000, timeout = 0) =>
  mapSeries(chunk(values, size), async (chunk) => {
    await operation(chunk);
    timeout && (await new Promise((resolve) => setTimeout(resolve, timeout)));
  });
