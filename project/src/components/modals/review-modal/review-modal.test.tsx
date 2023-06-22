import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewModal from './review-modal';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { promoProductMock } from '../../../mocks/mocks';
import { Product } from '../../../types/products';

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

const setup = () => render(
  <Provider store={store} >
    <ReviewModal product={promoProductMock as Product}/>
  </Provider>
);

describe('User review form', () => {
  test('renders inputs and buttons correctly', () => {
    setup();
    const ratingInputs = screen.getAllByRole('radio');
    const nameInput = screen.getByLabelText('Ваше имя');
    const advantageInput = screen.getByLabelText('Достоинства');
    const disadvantageInput = screen.getByLabelText('Недостатки');
    const reviewInput = screen.getByLabelText('Комментарий');
    const submitButton = screen.getByRole('button', { name: 'Отправить отзыв' });


    expect(ratingInputs.length).toBe(5);
    expect(nameInput).toBeInTheDocument();
    expect(advantageInput).toBeInTheDocument();
    expect(disadvantageInput).toBeInTheDocument();
    expect(reviewInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

  });
});
