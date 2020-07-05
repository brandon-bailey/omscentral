import React from 'react';

import { Course as CourseType } from 'src/graphql';
import ReviewCardListConnected from 'src/components/ReviewCardListConnected';
import Metrics from './components/Metrics';

interface Props {
  course: CourseType;
}

const Course: React.FC<Props> = ({ course }) => (
  <ReviewCardListConnected
    variables={{ course_id: course.id }}
    before={<Metrics course={course} />}
  />
);

export default Course;
