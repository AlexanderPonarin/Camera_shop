import { render, fireEvent } from '@testing-library/react';
import { useModalKeyboardEvents } from './use-modal-keyboard-events';

describe('useModalKeyboardEvents', () => {
  let modalRefMock: React.RefObject<HTMLElement>;
  let addModalViewStatusDispatchMock: jest.Mock;
  let reviewModalViewStatusDispatchMock: jest.Mock;
  let reviewModalSuccessViewStatusDispatchMock: jest.Mock;
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    modalRefMock = {
      current: document.createElement('div'),
    };
    addModalViewStatusDispatchMock = jest.fn();
    reviewModalViewStatusDispatchMock = jest.fn();
    reviewModalSuccessViewStatusDispatchMock = jest.fn();
    dispatchMock = jest.fn().mockImplementation((dispatchAction) => {
      if (typeof dispatchAction === 'function') {
        return dispatchAction(dispatchMock);
      }
      return dispatchAction;
    });

    jest
      .spyOn(require('../store/modal-view-process/modal-view-process'), 'setAddItemModalViewStatus')
      .mockImplementation((status: boolean) => addModalViewStatusDispatchMock(status));
    jest
      .spyOn(require('../store/modal-view-process/modal-view-process'), 'setReviewModalViewStatus')
      .mockImplementation((status: boolean) => reviewModalViewStatusDispatchMock(status));
    jest
      .spyOn(require('../store/modal-view-process/modal-view-process'), 'setReviewModalSuccessViewStatus')
      .mockImplementation((status: boolean) => reviewModalSuccessViewStatusDispatchMock(status));
    jest.spyOn(require('.'), 'useAppDispatch').mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should add event listener on mount', () => {
    const { unmount } = render(<div ref={modalRefMock} />);
    expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    unmount();
    expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should remove event listener on unmount', () => {
    const { unmount } = render(<div ref={modalRefMock} />);
    unmount();
    expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should dispatch setAddItemModalViewStatus, setReviewModalSuccessViewStatus and setReviewModalViewStatus to false when Escape key is pressed', () => {
    render(<div ref={modalRefMock} />);
    const escapeKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeKeyEvent);
    expect(addModalViewStatusDispatchMock).toHaveBeenCalledWith(false);
    expect(reviewModalViewStatusDispatchMock).toHaveBeenCalledWith(false);
    expect(reviewModalSuccessViewStatusDispatchMock).toHaveBeenCalledWith(false);
  });

  it('should focus on first element inside the modalRef when modalRef is mounted', () => {
    render(
      <div ref={modalRefMock}>
        <button>button1</button>
      </div>
    );
    expect(modalRefMock.current?.focus).toHaveBeenCalled();
  });

  it('should focus on first element inside the modalRef when Tab key is pressed and shift key is not pressed and the last element is focused', () => {
    const { getByText } = render(
      <div ref={modalRefMock}>
        <button>button1</button>
        <button>button2</button>
      </div>
    );

    const secondButton = getByText('button2');
    fireEvent.focus(secondButton);

    const tabKeyEvent = new KeyboardEvent('keydown', { key: 'Tab' });
    document.dispatchEvent(tabKeyEvent);

    expect(modalRefMock.current?.querySelectorAll('button')).toHaveLength(2);
    expect(modalRefMock.current?.querySelectorAll('button')[0]).toHaveFocus();
    expect(tabKeyEvent.preventDefault).toHaveBeenCalled();
  });

  it('should focus on last element inside the modalRef when Tab key is pressed and shift key is pressed and the first element is focused', () => {
    const { getByText } = render(
      <div ref={modalRefMock}>
        <button>button1</button>
        <button>button2</button>
      </div>
    );

    const firstButton = getByText('button1');
    fireEvent.focus(firstButton);
    fireEvent.keyDown(firstButton, { key: 'Tab', shiftKey: true });

    expect(modalRefMock.current?.querySelectorAll('button')).toHaveLength(2);
    expect(modalRefMock.current?.querySelectorAll('button')[1]).toHaveFocus();
  });
});
