import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

import { useStyles } from './SearchInput.styles';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({ value, onChange, onSubmit }) => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSubmit(value);
          }
        }}
      />
    </div>
  );
};

export default SearchInput;
