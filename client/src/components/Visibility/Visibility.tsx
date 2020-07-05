import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import LinearProgress from '@material-ui/core/LinearProgress';

interface Props {
  onVisible?: () => void;
}

const Visibility: React.FC<Props> = ({ onVisible }) => {
  const [busy, setBusy] = useState(false);

  const handleChange = async (isVisible: boolean) => {
    if (isVisible && onVisible) {
      try {
        setBusy(true);
        await onVisible();
      } finally {
        setBusy(false);
      }
    }
  };

  return (
    <VisibilitySensor onChange={handleChange} active={Boolean(onVisible)}>
      <div style={{ height: 4 }}>{busy ? <LinearProgress /> : ' '}</div>
    </VisibilitySensor>
  );
};

export default Visibility;
