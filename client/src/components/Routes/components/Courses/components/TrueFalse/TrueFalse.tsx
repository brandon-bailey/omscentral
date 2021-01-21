import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import React from 'react';

interface Props {
  value?: boolean;
}

const TrueFalse: React.FC<Props> = ({ value }) => (
  <Typography variant="body2">
    {value ? <CheckIcon fontSize="small" /> : null}
  </Typography>
);

export default TrueFalse;
