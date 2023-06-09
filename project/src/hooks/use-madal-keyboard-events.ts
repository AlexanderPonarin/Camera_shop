import { useEffect } from 'react';
import { setAddItemModalViewStatus } from '../store/modal-view-process/modal-view-process';
import { useAppDispatch } from '.';

type UseModalKeyboardEventsProps = {
    modalRef: React.RefObject<HTMLElement>;
  }

export const useModalKeyboardEvents = ({ modalRef }: UseModalKeyboardEventsProps) => {
  const dispatch = useAppDispatch();

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      dispatch(setAddItemModalViewStatus(false));
    }
    if (event.key === 'Tab') {
      const focusableItems = modalRef.current?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || [];
      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === firstItem) {
          lastItem.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastItem) {
          firstItem.focus();
          event.preventDefault();
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    modalRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [dispatch, modalRef]);
};
