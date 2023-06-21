import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CatalogScreen from './catalog-screen';
import ProductCard from '../../components/product-card/product-card';
import CatalogFilterForm from '../../components/catalog-filter-form/catalog-filter-form';
import CatalogSortForm from '../../components/catalog-sort-form/catalog-sort-form';
import { Products } from '../../types/products';
import {BrowserRouter as Router } from 'react-router-dom';
import { PromoProduct } from '../../types/promo-product';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';


const mockStore = configureMockStore();
const store = mockStore({
  MODALVIEW: {
    addProductModalViewStatus: false
  }
});

describe('CatalogScreen', () => {
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
    render(<CatalogFilterForm />);
    expect(screen.getByText(/Категория/)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/)).toBeInTheDocument();
  });

  it('renders the CatalogSortForm component', () => {
    render(<CatalogSortForm />);
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });

});
