import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import AddProductModal from './add-product-modal';
import { setAddItemModalViewStatus } from '../../../store/modal-view-process/modal-view-process';
import { Product } from '../../../types/products';
import { useAppDispatch } from '../../../hooks';

jest.mock('../../../hooks/use-scroll-lock', () => jest.fn());
jest.mock('../../../hooks/use-modal-keyboard-events', () => ({
  useModalKeyboardEvents: jest.fn(),
}));

jest.mock('../../../store/modal-view-process/selectors', () => ({
  getAddItemModalStatus: jest.fn(() => true),
}));

jest.mock('../../../hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(() => jest.fn()),
}));

const product: Product = {
  id: 1,
  name: 'Test product',
  type: 'test type',
  level: 'beginner',
  price: 10,
  vendorCode: '12345',
  previewImg: 'testImg.jpg',
  previewImg2x: 'testImg@2x.jpg',
  previewImgWebp: 'testImg.webp',
  previewImgWebp2x: 'testImg@2x.webp',
} as unknown as Product;

const setup = () => {
  render(<AddProductModal product={product} />);
};

describe('AddProductModal', () => {
  it('should render', () => {
    setup();
    const modal = screen.getByTestId('add-product-modal');
    expect(modal).toBeInTheDocument();
  });

  it('should render product description', () => {
    setup();
    const title = screen.getByText('Добавить товар в корзину');
    expect(title).toBeInTheDocument();

    const article = screen.getByText('Артикул:');
    expect(article).toBeInTheDocument();

    const number = screen.getByText('12345');
    expect(number).toBeInTheDocument();

    const type = screen.getByText('test type');
    expect(type).toBeInTheDocument();

    const level = screen.getByText('beginner');
    expect(level).toBeInTheDocument();

    const price = screen.getByText('10 ₽');
    expect(price).toBeInTheDocument();
  });

  it('should dispatch setAddItemModalViewStatus action on click outside modal', () => {
    const dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    setup();

    const modal = screen.getByTestId('add-product-modal');
    fireEvent.click(modal);
    expect(dispatch).toHaveBeenCalledWith(setAddItemModalViewStatus(false));
  });

  it('should dispatch setAddItemModalViewStatus action on click on close button', () => {
    const dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    setup();

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);
    expect(dispatch).toHaveBeenCalledWith(setAddItemModalViewStatus(false));
  });

  it('should match snapshot', () => {
    setup();
    const modal = screen.getByTestId('add-product-modal');
    expect(modal).toMatchSnapshot();
  });

});
