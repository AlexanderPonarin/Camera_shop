import { useEffect, useRef } from 'react';
import { useAppSelector } from '.';
import { getReviewModalSuccessStatus, getAddItemModalStatus, getReviewModalStatus } from '../store/modal-view-process/selectors';

function useScrollLock() {
  const bodyRef = useRef(document.body);
  const reviewModalSuccessStatus = useAppSelector(getReviewModalSuccessStatus);
  const addItemModalViewStatus = useAppSelector(getAddItemModalStatus);
  const reviewModalViewStatus = useAppSelector(getReviewModalStatus);

  useEffect(() => {
    if (reviewModalSuccessStatus || reviewModalViewStatus || addItemModalViewStatus) {
      const { current } = bodyRef;
      const originalOverflow = window.getComputedStyle(current).overflow;
      current.style.overflow = 'hidden';
      return () => {
        current.style.overflow = originalOverflow;
      };}
    if (!reviewModalSuccessStatus || !reviewModalViewStatus || !addItemModalViewStatus) {
      const { current } = bodyRef;
      const originalOverflow = window.getComputedStyle(current).overflow;
      current.style.overflow = '';
      return () => {
        current.style.overflow = originalOverflow;
      };}
  }, [addItemModalViewStatus, reviewModalSuccessStatus, reviewModalViewStatus]);
  return bodyRef;
}

export default useScrollLock;
