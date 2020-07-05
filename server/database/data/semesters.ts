import { PartialModelObject as PMO } from 'objection';
import { chain, range, memoize } from 'lodash';

import { Semester } from '../../src/models';
import { Season } from '../../src/enums';
import { unknownSemester } from '../../src/constants';

const getSeasonDisplayName = memoize((season: Season): string => {
  switch (season) {
    case Season.Spring:
      return 'Spring';
    case Season.Summer:
      return 'Summer';
    case Season.Fall:
      return 'Fall';
    default:
      throw new Error();
  }
});

export const semesters: PMO<Semester>[] = chain(range(2014, 2021))
  .map((year) =>
    [Season.Spring, Season.Summer, Season.Fall].map((season) => ({
      id: `${year}-${season}`,
      year,
      season,
      name: `${getSeasonDisplayName(season)} ${year}`,
    })),
  )
  .flatten()
  .reverse()
  .concat(unknownSemester)
  .reverse()
  .value();
