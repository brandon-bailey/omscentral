import React from 'react';
import { Helmet } from 'react-helmet';
import Static from 'src/components/Static';
import { useConfigQuery } from 'src/graphql';

const Terms: React.FC = () => {
  const { data } = useConfigQuery({ variables: { id: 'terms' } });

  return (
    <>
      <Helmet title="Terms &amp; Conditions">
        <meta
          name="description"
          content="Terms &amp; conditions for omscentral.com."
        />
      </Helmet>
      {data?.config?.value && <Static html={data.config.value} />}
    </>
  );
};

export default Terms;
