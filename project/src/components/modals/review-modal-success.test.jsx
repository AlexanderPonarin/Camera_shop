import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewModalSuccess from './review-modal-success';
import { store } from '../../store/index';
import { Provider } from 'react-redux';


describe('ReviewModalSuccess', () => {
  it('renders the success message and button', () => {
    render(
      <Provider store={store}>
        <ReviewModalSuccess />
      </Provider>
    );
    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Вернуться к покупкам' })).toBeInTheDocument();
  });
});
