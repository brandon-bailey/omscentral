import { Semester } from '../models';

const unknownSemester = new Semester();

unknownSemester.id = '0000-0';
unknownSemester.name = 'Unknown';
unknownSemester.year = 0;
unknownSemester.season = 0;

export { unknownSemester };
