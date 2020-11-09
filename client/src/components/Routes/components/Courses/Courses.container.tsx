import React from 'react';
import { Helmet } from 'react-helmet';

import { useCoursesQuery, useSpecializationsQuery } from 'src/graphql';
import Courses from './Courses';

const CoursesContainer: React.FC = () => {
  const courses = useCoursesQuery({ fetchPolicy: 'no-cache' });
  const specializations = useSpecializationsQuery({
    fetchPolicy: 'cache-and-network',
  });

  return (
    <>
      <Helmet title="Courses">
        <meta
          name="description"
          content="Course reviews for Georgia Tech's OMSCS, OMSA, &amp; OMSCyber programs."
        />
      </Helmet>
      <Courses
        courses={courses.data?.courses}
        specializations={specializations.data?.specializations}
        loading={courses.loading || specializations.loading}
      />
    </>
  );
};

export default CoursesContainer;
