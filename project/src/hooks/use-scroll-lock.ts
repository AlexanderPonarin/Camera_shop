import { useEffect, useRef } from 'react';
import { useAppSelector } from '.';
import { getReviewModalSuccessStatus, getAddItemModalStatus, getReviewModalStatus } from '../store/modal-view-process/selectors';

function useScrollLock() {
  const bodyRef = useRef(document.body);
  const reviewModalSuccessStatus = useAppSelector(getReviewModalSuccessStatus);
  const addItemModalViewStatus = useAppSelector(getAddItemModalStatus);
  const reviewModalViewStatus = useAppSelector(getReviewModalStatus);

  useEffect(() => {
    const { current } = bodyRef;

    const handleLockScroll = () => {
      const windowPosition = current.getBoundingClientRect();
      current.style.overflowY = 'scroll';
      current.style.position = 'fixed';
      current.style.width = '100%';
      current.style.top = `${windowPosition.top}px`;
    };

    const handleUnlockScroll = () => {
      const windowPosition = current.getBoundingClientRect();
      current.style.position = '';
      current.style.width = '';
      current.style.top = `${windowPosition.bottom}px`;
    };

    if (reviewModalSuccessStatus || reviewModalViewStatus || addItemModalViewStatus) {
      handleLockScroll();

      return () => handleUnlockScroll();
    }

  }, [addItemModalViewStatus, reviewModalSuccessStatus, reviewModalViewStatus]);

  return bodyRef;
}

export default useScrollLock;
