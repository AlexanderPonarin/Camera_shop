import React from 'react';
import { render, screen } from '@testing-library/react';
import CatalogScreen from './catalog-screen';
import { Products } from '../../types/products';
import { BrowserRouter as Router } from 'react-router-dom';
import { PromoProduct } from '../../types/promo-product';
import configureMockStore from 'redux-mock-store';
import { Reviews } from '../../types/reviews';
import App from '../../components/app/app';
import { Provider } from 'react-redux';


const mockStore = configureMockStore();
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

const reviews = {
  1: [
    {
      id: 1,
      review: 'Good product.',
    },
    {
      id: 2,
      review: 'Bad product.',
    },
  ],
  2: [
    {
      id: 1,
      review: 'Good product.',
    },
    {
      id: 2,
      review: 'Bad product.',
    },
  ]
} as unknown as {[key: number]: Reviews};

const store = mockStore({
  DATA: {
    isProductsDataLoading: false,
    products: mockProducts,
    promoProduct: mockPromoProduct
  },
  MODALVIEW: {
    addProductModalViewStatus: false
  }
});

describe('CatalogScreen', () => {


  it('renders catalog screen component', () => {
    render(
      <Provider store={store}>
        <Router >
          <App />
        </Router>
      </Provider>
    );

    //screen.debug(screen.getByRole('body'));

    expect(screen.getByText(/Sample Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Description 1/)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
  });

  it('renders the CatalogFilterForm component', () => {
    render(
      <Provider store={store}>
        <Router >
          <App />
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
          <App />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });

});
