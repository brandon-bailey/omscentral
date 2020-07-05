import { writeFileSync } from 'fs';
import { init } from './utils';
import { Course } from '../models';

async function main(): Promise<void> {
  const courses = await Course.query();
  writeFileSync(
    `${__dirname}/../../../_courses.json`,
    JSON.stringify(courses, null, 2),
    'utf8',
  );
}

init(main);
