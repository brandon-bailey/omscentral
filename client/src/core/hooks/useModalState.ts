import { useCallback, useState } from 'react';

const useModalState = (
  initialState: boolean,
): {
  isShown: boolean;
  onShow: () => void;
  onHide: () => void;
} => {
  const [isShown, setIsShown] = useState(initialState);

  return {
    isShown,
    onShow: useCallback(() => setIsShown(true), []),
    onHide: useCallback(() => setIsShown(false), []),
  };
};

export default useModalState;
