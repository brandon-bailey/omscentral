import React from 'react';
import { Helmet } from 'react-helmet';
import Static from 'src/components/Static';
import { useConfigQuery } from 'src/graphql';

const Privacy: React.FC = () => {
  const { data } = useConfigQuery({ variables: { id: 'privacy' } });

  return (
    <>
      <Helmet title="Privacy Policy">
        <meta name="description" content="Privacy policy for omscentral.com." />
      </Helmet>
      {data?.config?.value && <Static html={data.config.value} />}
    </>
  );
};

export default Privacy;
