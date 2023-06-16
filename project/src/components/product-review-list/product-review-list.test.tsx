import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../types/products';
import ProductReviewList from './product-review-list';
import { Reviews } from '../../types/reviews';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

const mockReviews = [
  {
    id: '1',
    userName: 'author1',
    review: 'text1',
    createAt: '2022-07-09T13:24:57.980Z',
  },
  {
    id: '2',
    userName: 'author2',
    review: 'text2',
    createAt: '2022-07-09T13:24:57.980Z',
  },
  {
    id: '3',
    userName: 'author3',
    review: 'text3',
    createAt: '2022-07-09T13:24:57.980Z',
  },
  {
    id: '3',
    userName: 'author3',
    review: 'text3',
    createAt: '2022-07-09T13:24:57.980Z',
  }
] as Reviews;

const mockProduct: Product = {
  id: 1,
  name: 'product1',
  vendorCode: 'vendorCode1',
  description: 'description1',
  price: 100,
} as Product;

describe('ProductReviewList', () => {
  let mockUseDispatch: jest.Mock;
  let mockUseSelector: jest.Mock;

  beforeEach(() => {
    mockUseDispatch = useDispatch as jest.Mock;
    mockUseDispatch.mockReturnValue(jest.fn());
    mockUseSelector = useSelector as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render component properly for empty list of reviews', () => {
    mockUseSelector.mockReturnValueOnce(mockProduct.vendorCode);
    mockUseSelector.mockReturnValueOnce([]);
    render(<ProductReviewList product={mockProduct} />);
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
  });

  it('should render component properly for non-empty list of reviews', () => {
    mockUseSelector.mockReturnValueOnce(mockProduct.vendorCode);
    mockUseSelector.mockReturnValueOnce(mockReviews);
    render(<ProductReviewList product={mockProduct} />);
    expect(screen.queryByText('Empty list')).not.toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
    expect(screen.getByText('author1')).toBeInTheDocument();
    expect(screen.getByText('text1')).toBeInTheDocument();
  });
});
