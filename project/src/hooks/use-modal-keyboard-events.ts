import { useEffect, useState } from 'react';
import { setAddItemModalViewStatus, setAddItemSuccessModalViewStatus, setBasketRemoveItemModalViewStatus, setItemBasketSuccessModalViewStatus, setReviewModalSuccessViewStatus, setReviewModalViewStatus } from '../store/modal-view-process/modal-view-process';
import { useAppDispatch } from '.';

type UseModalKeyboardEventsProps = {
    modalRef: React.RefObject<HTMLElement>;
  }

export const useModalKeyboardEvents = ({ modalRef }: UseModalKeyboardEventsProps) => {
  const dispatch = useAppDispatch();

  const handleKeyPress = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(setAddItemModalViewStatus(false));
      dispatch(setReviewModalViewStatus(false));
      dispatch(setReviewModalSuccessViewStatus(false));
      dispatch(setAddItemSuccessModalViewStatus(false));
      dispatch(setItemBasketSuccessModalViewStatus(false));
      dispatch(setBasketRemoveItemModalViewStatus(false));

    }
    if (evt.key === 'Tab') {
      const focusableItems = modalRef.current?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || [];
      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];
      if (evt.shiftKey) {
        if (document.activeElement === firstItem) {
          lastItem.focus();
          evt.preventDefault();
        }
      } else {
        if (document.activeElement === lastItem) {
          firstItem.focus();
          evt.preventDefault();
        }
      }
    }
  };

  useEffect(() => {
    modalRef.current?.focus();
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [dispatch, modalRef]);
};
