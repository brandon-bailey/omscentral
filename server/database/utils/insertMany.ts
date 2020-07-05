import { Domain } from '../../src/models/Domain';
import { serialize } from '../../src/utils';

export async function insertMany<T>(
  values: Partial<T>[],
  model: typeof Domain,
): Promise<void> {
  await serialize(values, (chunk) => model.query().insert(chunk));
}
