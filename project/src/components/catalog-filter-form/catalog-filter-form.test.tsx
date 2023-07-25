import React from 'react';
import CatalogFilterForm from './catalog-filter-form';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {BrowserRouter as Router } from 'react-router-dom';
import {Products } from '../../types/products';

const mockStore = configureMockStore();
const onFilterChangedHandler = jest.fn();
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
  DATA: {
    products: products
  }
});

describe('Catalog filter form component', () => {
  test('renders a price filter fieldset', () => {
    render(
      <Provider store={store}>
        <Router >
          <CatalogFilterForm onFilterChangedHandler={onFilterChangedHandler} products={products}/>
        </Router>
      </Provider>
    );
    const priceFieldset = screen.getByRole('group', { name: /цена/i });
    expect(priceFieldset).toBeInTheDocument();
  });

  test('renders category checkboxes', () => {
    render(
      <Provider store={store}>
        <Router >
          <CatalogFilterForm onFilterChangedHandler={onFilterChangedHandler} products={products}/>
        </Router>
      </Provider>
    );
    const categoryCheckboxes = screen.getAllByRole('checkbox', { name: /фотокамера|видеокамера/i });
    expect(categoryCheckboxes.length).toBe(2);
  });

  test('renders a type cameras checkboxes fieldset', () => {
    render(
      <Provider store={store}>
        <Router >
          <CatalogFilterForm onFilterChangedHandler={onFilterChangedHandler} products={products}/>
        </Router>
      </Provider>
    );
    const typeCamerasFieldset = screen.getByRole('group', { name: /тип камеры/i });
    expect(typeCamerasFieldset).toBeInTheDocument();
  });

  test('renders level checkboxes', () => {
    render(
      <Provider store={store}>
        <Router >
          <CatalogFilterForm onFilterChangedHandler={onFilterChangedHandler} products={products}/>
        </Router>
      </Provider>
    );
    const levelCheckboxes = screen.getAllByRole('checkbox', { name: /нулевой|любительский|профессиональный/i });
    expect(levelCheckboxes.length).toBe(3);
  });

  test('renders a reset button', () => {
    render(
      <Provider store={store}>
        <Router >
          <CatalogFilterForm onFilterChangedHandler={onFilterChangedHandler} products={products}/>
        </Router>
      </Provider>
    );
    const resetButton = screen.getByRole('button', { name: /сбросить фильтры/i });
    expect(resetButton).toBeInTheDocument();
  });
});
