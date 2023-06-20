import { render, screen, fireEvent } from '@testing-library/react';
import ProductReviewList from './product-review-list';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { Product } from '../../types/products';

const product = {
  id: '1',
  vendorCode: '12345',
  name: 'test product',
  description: 'test description',
  price: 10,
  imageUrl: 'test.jpg',
} as unknown as Product;

describe('ProductReviewList', () => {
  test('renders product review list component', () => {
    render(
      <Provider store={store}>
        <ProductReviewList product={product} />
      </Provider>
    );

    const reviewTitle = screen.getByText('Отзывы');
    const reviewButton = screen.getByText('Оставить свой отзыв');

    expect(reviewTitle).toBeInTheDocument();
    expect(reviewButton).toBeInTheDocument();
  });

  test('clicking on "Оставить свой отзыв" button opens review modal', () => {
    render(
      <Provider store={store}>
        <ProductReviewList product={product} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Оставить свой отзыв'));

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
  });
});
