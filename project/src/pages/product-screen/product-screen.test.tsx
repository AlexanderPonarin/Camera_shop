import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ProductScreen from './product-screen';
import { Product } from '../../types/products';

const mockStore = configureMockStore([thunk]);

describe('<ProductScreen />', () => {
  const store = mockStore({
    MODALVIEW: {addItemModalViewStatus: false}
  });

  const mockProduct: Product = {
    id: 1,
    name: 'product name',
    description: 'product description',
    price: 1000,
  } as Product;


  it('renders the component', () => {
    render(
      <Provider store={store}>
        <ProductScreen
          product={mockProduct}
        />
      </Provider>
    );
  });

  expect(screen.getByText(/product name/i)).toBeInTheDocument();
  expect(screen.getByText(/product description/i)).toBeInTheDocument();
  expect(screen.getByText(/добавить в корзину/i)).toBeInTheDocument();
});

it('adds a product to basket on "Add to cart" button click', () => {
  const store = mockStore({
    MODALVIEW: {addItemModalViewStatus: false,}
  });
  const mockProduct: Product = {
    id: 1,
    name: 'product name',
    description: 'product description',
    price: 1000,
  } as Product;

  render(
    <Provider store={store}>
      <ProductScreen
        product={mockProduct}
      />
    </Provider>
  );

  fireEvent.click(screen.getByText(/добавить в корзину/i));
  expect(store.getActions()).toEqual([{ type: 'SET_ADD_ITEM_MODAL_VIEW_STATUS', payload: true }]);
});

