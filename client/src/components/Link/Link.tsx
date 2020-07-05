import React from 'react';
import { useHistory } from 'react-router';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import MaterialLink from '@material-ui/core/Link';

const Link: React.FC<LinkProps & { to: string }> = (props) => {
  const history = useHistory();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push(props.to);
  };

  return (
    <RouterLink component={MaterialLink} {...props} onClick={handleClick} />
  );
};

export default Link;
