import React from 'react';
import { render, screen } from '@testing-library/react';
import CatalogScreen from './catalog-screen';
import { Products } from '../../types/products';
import {BrowserRouter as Router } from 'react-router-dom';
import { PromoProduct } from '../../types/promo-product';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { UserProducts } from '../../types/user-products';


const mockStore = configureMockStore();


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
  2:[
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
  ]};


describe('CatalogScreen', () => {
  const mockUserProducts: UserProducts = [
    { product: {
      id: 1,
      name: 'Sample Product 1',
      description: 'Sample Description 1',
      price: 100,
    }},
  ] as unknown as UserProducts;

  const mockProducts: Products = [{
    id: 1,
    name: 'Sample Product 1',
    description: 'Sample Description 1',
    price: 100,
  },
  {
    id: 2,
    name: 'Sample Product 2',
    description: 'Sample Description 2',
    price: 200,
  }] as unknown as Products;


  const mockPromoProduct: PromoProduct = {
    id: 1,
    name: 'Product Name',
    price: 100,
    reviewCount: 5,
  } as unknown as PromoProduct;

  const store = mockStore({
    DATA: {
      reviews: reviews,
      products: mockProducts
    },
    USER: {
      products: mockUserProducts
    },
    MODALVIEW: {
      addProductModalViewStatus: false
    }
  });

  it('renders catalog screen component', () => {
    render(
      <Provider store={store}>
        <Router >
          <CatalogScreen products={mockProducts} promoProduct={mockPromoProduct} />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Sample Product 1/)).toBeInTheDocument();
    expect(screen.getByText(/Sample Description 1/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });

  it('renders the CatalogFilterForm component', () => {
    render(
      <Provider store={store}>
        <Router >
          <CatalogScreen products={mockProducts} promoProduct={mockPromoProduct} />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Категория/)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/)).toBeInTheDocument();
  });

  it('renders the CatalogSortForm component', () => {
    render(
      <Provider store={store}>
        <Router >
          <CatalogScreen products={mockProducts} promoProduct={mockPromoProduct} />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });

});
