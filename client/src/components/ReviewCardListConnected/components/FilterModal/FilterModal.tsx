import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import { Option } from 'src/core/types';

interface Props<T> {
  title?: string;
  label?: string;
  options: Option<T>[];
  initialValue?: T[];
  onCancel: () => void;
  onClose?: () => void;
  onOk: (options: Option<T>[]) => void;
}

function FilterModal<T = string>({
  title = 'Filter',
  label = 'Options',
  options,
  initialValue = [],
  onCancel,
  onClose = onCancel,
  onOk,
}: Props<T>): React.ReactElement {
  const [value, setValue] = useState(
    options.filter((option) => initialValue.includes(option.value)),
  );

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form>
          <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.label}
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue);
            }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label={label} />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={(event) => {
            event.preventDefault();
            onOk(value);
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterModal;
