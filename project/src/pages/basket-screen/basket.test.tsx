import { render, screen } from '@testing-library/react';
import React from 'react';
import BasketScreen from './basket-screen';
import {BrowserRouter as Router } from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import { Products } from '../../types/products';

const mockStore = configureMockStore();
const products: Products = [
  { id: 1,
    name: 'Product Name',
    price: 100,
    previewImg: 'product.jpg',
    previewImg2x: 'product@2x.jpg',
    previewImgWebp: 'product.webp',
    previewImgWebp2x: 'product@2x.webp',
    reviewCount: 5,}
] as Products;

const store = mockStore({
  DATA: products
});

describe('BasketScreen', () => {
  it('should render the header', () => {
    render(
      <Provider store={store}>
        <Router>
          <BasketScreen />
        </Router>
      </Provider>

    );
    const headerAndFooter = screen.getAllByText('Доставка');
    expect(headerAndFooter[0]).toBeInTheDocument();
    expect(headerAndFooter[1]).toBeInTheDocument();

  });

  it('should render the page title', () => {
    render(
      <Provider store={store}>
        <Router>
          <BasketScreen />
        </Router>
      </Provider>
    );
    const basketTitles = screen.getAllByText('Корзина');
    expect(basketTitles[0]).toBeInTheDocument();
    expect(basketTitles[1]).toBeInTheDocument();

  });

});
