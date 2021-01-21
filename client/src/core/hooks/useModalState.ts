import React from 'react';

const useModalState = (
  initialState: boolean,
): {
  isShown: boolean;
  onShow: () => void;
  onHide: () => void;
} => {
  const [isShown, setIsShown] = React.useState(initialState);

  return {
    isShown,
    onShow: React.useCallback(() => setIsShown(true), []),
    onHide: React.useCallback(() => setIsShown(false), []),
  };
};

export default useModalState;
