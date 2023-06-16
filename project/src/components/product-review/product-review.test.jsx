import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductReview from './product-review';

const review = {
  id: '1',
  userName: 'John Smith',
  rating: 5,
  advantage: 'Great quality',
  disadvantage: 'None',
  review: 'I am very satisfied with this product',
  createdAt: '2022-04-13T10:00:00.000Z'
};

describe('ProductReview', () => {
  it('renders review information correctly', () => {
    render(<ProductReview review={review} />);
    expect(screen.getByText(review.userName)).toBeInTheDocument();
    expect(screen.getByText(`Оценка: ${review.rating}`)).toBeInTheDocument();
    expect(screen.getByText(review.advantage)).toBeInTheDocument();
    expect(screen.getByText(review.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(review.review)).toBeInTheDocument();
  });
});
