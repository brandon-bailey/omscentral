import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

import ErrorUI from './Error';

const ErrorContainer: React.FC = () => {
  const { code } = useParams<{ code: string }>();

  const text = useMemo(() => {
    switch (code) {
      case '400':
        return 'Bad Request';
      case '403':
        return 'Operation Forbidden';
      case '404':
        return 'Page Not Found';
      case '500':
        return 'Internal Server Error';
      default:
        return `Something went wrong. That's all we know.`;
    }
  }, [code]);

  return (
    <>
      <Helmet title="Error">
        <meta name="description" content={text} />
      </Helmet>
      <ErrorUI text={text} />
    </>
  );
};

export default ErrorContainer;
