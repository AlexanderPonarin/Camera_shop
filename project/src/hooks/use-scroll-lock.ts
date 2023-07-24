import { useEffect, useRef } from 'react';
import { useAppSelector } from '.';
import { getReviewModalSuccessStatus,
  getAddItemModalStatus, getReviewModalStatus,
  getAddItemSuccessModalStatus,
  getBasketRemoveItemModalStatus,
  getItemBasketSuccessModalStatus } from '../store/modal-view-process/selectors';

function useScrollLock() {
  const bodyRef = useRef(document.body);
  const reviewModalSuccessStatus = useAppSelector(getReviewModalSuccessStatus);
  const addItemModalViewStatus = useAppSelector(getAddItemModalStatus);
  const reviewModalViewStatus = useAppSelector(getReviewModalStatus);
  const addItemSuccessModalViewStatus = useAppSelector(getAddItemSuccessModalStatus);
  const itemBasketSuccessModalViewStatus = useAppSelector(getItemBasketSuccessModalStatus);
  const basketRemoveItemModalViewStatus = useAppSelector(getBasketRemoveItemModalStatus);


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

    if (reviewModalSuccessStatus || reviewModalViewStatus || addItemModalViewStatus ||
      addItemSuccessModalViewStatus || itemBasketSuccessModalViewStatus || basketRemoveItemModalViewStatus) {
      handleLockScroll();

      return () => handleUnlockScroll();
    }

  }, [addItemModalViewStatus, addItemSuccessModalViewStatus, basketRemoveItemModalViewStatus,
    itemBasketSuccessModalViewStatus, reviewModalSuccessStatus, reviewModalViewStatus]);

  return bodyRef;
}

export default useScrollLock;
