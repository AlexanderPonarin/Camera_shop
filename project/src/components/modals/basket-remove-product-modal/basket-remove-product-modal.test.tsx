import AddProductSuccessModal from './basket-remove-product-modal';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {BrowserRouter as Router } from 'react-router-dom';
import BasketRemoveProductModal from './basket-remove-product-modal';
import { Product } from '../../../types/products';


const mockStore = configureMockStore();

const mockProduct = {
  id: 1,
  name: 'Sample Product 1',
  description: 'Sample Description 1',
  price: 100,
} as Product;

const strore = mockStore({
  USER: {
    products: []
  },
  MODALVIEW: {
    basketRemoveItemModalViewStatus: true
  }
});

it('render BasketRemoveProductModal component correctly', () => {
  render(
    <Provider store={strore}>
      <Router>
        <BasketRemoveProductModal product={mockProduct} />
      </Router>
    </Provider>
  );
  expect(screen.getByText(/Удалить этот товар/i)).toBeInTheDocument();
  expect(screen.getByText(/Продолжить покупки/)).toBeInTheDocument();
  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
});
