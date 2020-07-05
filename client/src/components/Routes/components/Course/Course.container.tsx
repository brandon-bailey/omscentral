import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

import { useCourseQuery } from 'src/graphql';
import Course from './Course';

const CourseContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useCourseQuery({
    variables: {
      id,
    },
    fetchPolicy: 'no-cache',
  });

  return (
    <>
      <Helmet title={id}>
        {data?.course && <meta name="description" content={data.course.name} />}
      </Helmet>
      {data?.course ? <Course course={data.course} /> : null}
    </>
  );
};

export default CourseContainer;
