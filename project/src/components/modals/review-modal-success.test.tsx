import React from 'react';
import ReviewModalSuccess from './review-modal-success';
import {useAppDispatch} from '../../hooks';
import {render, screen, fireEvent} from '@testing-library/react';
import {setReviewModalSuccessViewStatus} from '../../store/modal-view-process/modal-view-process';


jest.mock('../../hooks/use-scroll-lock', () => jest.fn());
jest.mock('../../hooks/use-modal-keyboard-events', () => ({
  useModalKeyboardEvents: jest.fn(),
}));

jest.mock('../../store/modal-view-process/selectors', () => ({
  getAddItemModalStatus: jest.fn(() => true),
}));

jest.mock('../../hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(() => jest.fn()),
}));

const setup = () => {
  render(<ReviewModalSuccess />);
};
describe('ReviewModalSuccess', () => {
  it('renders the success message and button', () => {
    setup();
    expect(screen.getByTestId('review-modal-success')).toBeInTheDocument();
    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Вернуться к покупкам' })).toBeInTheDocument();
  });

  it('should dispatch setAddItemModalViewStatus action on click on close button', () => {
    const dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    setup();

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);
    expect(dispatch).toHaveBeenCalledWith(setReviewModalSuccessViewStatus(false));
  });
});
