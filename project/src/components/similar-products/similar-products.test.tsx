import React from 'react';
import { act, render, screen, fireEvent, getByRole } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SimilarProducts from './similar-products';
import { Product, Products } from '../../types/products';
import { setActiveProductVenderCode } from '../../store/product-data/product-data';
import {BrowserRouter as Router } from 'react-router-dom';
import App from '../app/app';
import { PromoProduct } from '../../types/promo-product';
import userEvent from '@testing-library/user-event';
import ProductScreen from '../../pages/product-screen/product-screen';


const mockStore = configureMockStore();
const mockProducts = [
  {
    'id': 1,
    'name': 'кексо фотик',
    'type': 'Коллекционная',
    'category': 'Видеокамера',
    'level': 'Нулевой',
    'price': 65000,
  }] as Products;

const reviews = {
  1:[
    {
      id: 1,
      author: 'User 1',
      reviewText: 'Good product.',
    },
    {
      id: 2,
      author: 'User 2',
      reviewText: 'Bad product.',
    },
  ],
  3:[
    {
      id: 1,
      author: 'User 1',
      reviewText: 'Good product.',
    },
    {
      id: 2,
      author: 'User 2',
      reviewText: 'Bad product.',
    },
  ],
};

const similarProducts = [
  {
    id: 1,
    vendorCode: 'vc2',
  },
  {
    id: 1,
    vendorCode: 'vc3',
  },
];

const mockPromoProduct = {
  id: 1
} as PromoProduct;


const store = mockStore({
  DATA: {
    isProductsDataLoading: false,
    products: mockProducts,
    promoProduct: mockPromoProduct,
    similarProducts: similarProducts,
  },
  MODALVIEW: {
    addItemModalViewStatus: false
  }
});

describe('SimilarProducts', () => {

  const product: Product = {
    id: 1,
    vendorCode: 'vc1',
  } as Product;


  it('should render component and check initial slider state', () => {
    render(
      <Provider store={store}>
        <Router>
          <SimilarProducts product={product} cb={() => {}}/>
        </Router>
      </Provider>
    );
    const body = screen.getByRole('body')
    screen.debug(body)


    const ff = screen.getByText(/подробнее/i);

    userEvent.click(ff);

    screen.getByText('Похожие товары');


    expect(store.dispatch).toHaveBeenCalledWith(setActiveProductVenderCode(product.vendorCode));
  });

});
