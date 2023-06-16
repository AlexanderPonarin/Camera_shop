import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewModal from './review-modal';
import { Provider } from 'react-redux';
import { store } from '../../store';


describe('User review form', () => {
  test('renders inputs and buttons correctly', () => {
    render(
      <Provider store={store} >
        <ReviewModal />
      </Provider>
    );
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
