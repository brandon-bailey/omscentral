import { chain, memoize, range } from 'lodash';
import { PartialModelObject as PMO } from 'objection';

import { unknownSemester } from '../../src/constants';
import { Season } from '../../src/enums';
import { Semester } from '../../src/models';

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

const years = range(2014, new Date().getFullYear() + 1);

export const semesters: PMO<Semester>[] = chain(years)
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
