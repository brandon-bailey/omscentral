import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useLocation } from 'react-router';
import { Nullable } from 'src/core';

import {
  Specialization,
  useCoursesQuery,
  useSpecializationsQuery,
} from 'src/graphql';
import Courses from './Courses';

const CoursesContainer: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const specializationId = new URLSearchParams(location.search).get('sid');

  const courses = useCoursesQuery({ fetchPolicy: 'no-cache' });
  const specializations = useSpecializationsQuery({
    fetchPolicy: 'cache-and-network',
  });

  const handleSpecializationChange = (
    specialization: Nullable<Specialization>,
  ) => {
    const search = new URLSearchParams();

    if (specialization) {
      search.set('sid', specialization.id);
    }

    history.push({
      pathname: location.pathname,
      search: search.toString(),
    });
  };

  const specialization = specializations.data?.specializations?.find(
    ({ id }) => id === specializationId,
  );

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
        specialization={specialization}
        onSpecializationChange={handleSpecializationChange}
        specializations={specializations.data?.specializations}
        loading={courses.loading || specializations.loading}
      />
    </>
  );
};

export default CoursesContainer;
