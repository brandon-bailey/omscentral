import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import { Nullable } from 'src/core';
import round from 'src/utils/round';
import { useStyles } from './Stats.styles';

interface Props {
  mean?: number;
  median?: number;
  mode?: number;
  min?: number;
  max?: number;
}

const Stats: React.FC<Props> = ({ mean, median, mode, min, max }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Nullable<Element>>(null);

  if (!mean || !median || !mode || !min || !max) {
    return null;
  }

  const handlePopoverOpen = (event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const meanRounded = round(mean, 2);

  return (
    <>
      <Typography
        aria-owns={open ? 'stats-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {meanRounded}
      </Typography>
      <Popover
        id="stats-popover"
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {/* {[
          { id: 'mean', label: 'Mean', value: mean },
          { id: 'median', label: 'Median', value: median },
          { id: 'mode', label: 'Mode', value: mode }
        ].map(({ id, label, value }) => (
          <div className={classes.slider} key={id}>
            <Typography id={`stats-popover-${id}`}>{label}</Typography>
            <Slider
              defaultValue={round(value, 2)}
              valueLabelDisplay="off"
              getAriaValueText={String}
              aria-labelledby={`stats-popover-${id}`}
              min={min}
              max={max}
              step={1}
              marks={[
                { value: min, label: String(min) },
                { value: max, label: String(max) }
              ]}
            />
          </div>
        ))} */}
        <pre style={{ margin: 0 }}>
          {JSON.stringify(
            { mean: meanRounded, median, mode, min, max },
            null,
            2,
          )}
        </pre>
      </Popover>
    </>
  );
};

export default Stats;
