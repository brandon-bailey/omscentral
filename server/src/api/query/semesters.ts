import { unknownSemester } from '../../constants';
import { QueryResolvers } from '../../graphql';
import { Semester } from '../../models';

type Resolver = QueryResolvers['semesters'];

export const resolver: Resolver = () =>
  Semester.query().orderBy('id', 'desc').whereNot('id', unknownSemester.id);
