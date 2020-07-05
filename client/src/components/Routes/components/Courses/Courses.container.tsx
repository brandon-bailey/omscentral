import React from 'react';
import { Helmet } from 'react-helmet';

import { useCoursesQuery } from 'src/graphql';
import Courses from './Courses';

const CoursesContainer: React.FC = () => {
  const { data, loading } = useCoursesQuery({ fetchPolicy: 'no-cache' });

  return (
    <>
      <Helmet title="Courses">
        <meta
          name="description"
          content="Course reviews for Georgia Tech's OMSCS, OMSA, &amp; OMSCyber programs."
        />
      </Helmet>
      <Courses courses={data?.courses} loading={loading} />
    </>
  );
};

export default CoursesContainer;
