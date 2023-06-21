import { renderHook } from '@testing-library/react';
import { useModalKeyboardEvents } from './use-modal-keyboard-events';
import { useAppDispatch } from '../hooks/index';
import { setAddItemModalViewStatus, setReviewModalSuccessViewStatus, setReviewModalViewStatus } from '../store/modal-view-process/modal-view-process';
import { render, act } from '@testing-library/react';

jest.mock('../hooks/index', () => ({
  useAppDispatch: jest.fn(),
}));

describe('useModalKeyboardEvents', () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call dispatch with correct action creators when Escape key is pressed', () => {
    const modalRef = {
      current: document.createElement('div'),
    };
    renderHook(() => useModalKeyboardEvents({ modalRef }));
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(dispatch).toHaveBeenCalledWith(setAddItemModalViewStatus(false));
    expect(dispatch).toHaveBeenCalledWith(setReviewModalViewStatus(false));
    expect(dispatch).toHaveBeenCalledWith(setReviewModalSuccessViewStatus(false));
  });

  it('should not call dispatch when a key other than Escape or Tab is pressed', () => {
    const modalRef = {
      current: document.createElement('div'),
    };
    renderHook(() => useModalKeyboardEvents({ modalRef }));
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(event);
    expect(dispatch).not.toHaveBeenCalled();
  });

});
